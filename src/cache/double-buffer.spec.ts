import { delay } from '../utils';
import { CacheService } from './cache.service';

describe('DoubleBuffer', () => {
  const cache = new CacheService({
    host: 'localhost',
    port: 6379,
  });

  afterAll(() => {
    cache.disconnect();
  });

  describe('캐시 더블 버퍼링', () => {
    const key = 'programming-language:sorted-set:popular';

    const languages = [
      { score: 1.0, member: 'TypeScript' },
      { score: 0.9, member: 'Python' },
      { score: 0.8, member: 'C#' },
      { score: 0.7, member: 'Kotlin' },
      { score: 0.6, member: 'C++' },
      { score: 0.5, member: 'Go' },
      { score: 0.4, member: 'Ruby' },
      { score: 0.3, member: 'Rust' },
      { score: 0.2, member: 'Swift' },
      { score: 0.1, member: 'Java' },
    ];

    afterEach(async () => {
      await cache.flushall();
    });

    it('캐시 엑세스 & 캐시 리프레시 타이밍 에러 발생 케이스', async () => {
      // given
      // 초기 데이터 적재
      await setPopularLanguages(key, languages, 3, 0);

      // when
      // 캐시 리프레시와 동시에 캐시 엑세스
      const [, received] = await Promise.all([
        setPopularLanguages(key, languages, 3, 100),
        getPopularLanguages(key),
      ]);

      // then
      expect(received).not.toEqual(languages.map(({ member }) => member));
    });

    it('캐시 엑세스 & 캐시 리프레시 타이밍 에러 해결 케이스', async () => {
      // given
      // 초기 데이터 적재
      await setPopularLanguages(key, languages, 3, 0, true);

      // when
      // 캐시 리프레시와 동시에 캐시 엑세스
      const [, received] = await Promise.all([
        setPopularLanguages(key, languages, 3, 100, true),
        getPopularLanguages(key),
      ]);

      // then
      expect(received).toEqual(languages.map(({ member }) => member));
    });

    async function setPopularLanguages(
      key: string,
      languages: { score: number; member: string }[],
      batchSize: number,
      _delay: number = 100,
      withDoubleBuffering: boolean = false,
    ) {
      // 캐시 초기화
      if (!withDoubleBuffering) await cache.del(key);

      await Promise.all(
        languages
          .reduce<{ score: number; member: string }[][]>(
            (acc, language, index) => {
              const batchIndex = Math.floor(index / batchSize);
              if (!acc[batchIndex]) acc[batchIndex] = [];
              acc[batchIndex].push(language);
              return acc;
            },
            [],
          )
          .map(async (batch) => {
            // 다른 작업을 수행한다고 가정하고 대기
            await delay(_delay);
            await cache.zadd(
              `${key}:temp`,
              ...batch.flatMap(({ score, member }) => [score, member]),
            );
          }),
      );

      // 캐시 리프레시
      await cache.rename(`${key}:temp`, key);
    }

    async function getPopularLanguages(key: string) {
      return cache.zrevrange(key, 0, -1);
    }
  });
});
