import Image from "next/image";
import styles from "./contributors.module.css";

interface Contributor {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  contributions: number;
}

interface ContributorStats {
  author: {
    login: string;
    id: number;
    avatar_url: string;
  };
  total: number;
  weeks: Array<{
    w: number;
    a: number;
    d: number;
    c: number;
  }>;
}

interface EnrichedContributor extends Contributor {
  additions: number;
  deletions: number;
  totalCommits: number;
}

async function getContributors(): Promise<Contributor[]> {
  const res = await fetch(
    "https://api.github.com/repos/anisayari/voyonsvoir/contributors",
    {
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
      next: { revalidate: 3600 },
    }
  );

  if (!res.ok) {
    return [];
  }

  return res.json();
}

async function getContributorStats(): Promise<ContributorStats[]> {
  const res = await fetch(
    "https://api.github.com/repos/anisayari/voyonsvoir/stats/contributors",
    {
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
      next: { revalidate: 3600 },
    }
  );

  if (!res.ok || res.status === 202) {
    return [];
  }

  const data = await res.json();

  if (!Array.isArray(data)) {
    return [];
  }

  return data;
}

function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
}

export default async function ContributorsPage() {
  const [contributors, stats] = await Promise.all([
    getContributors(),
    getContributorStats(),
  ]);

  const statsMap = new Map(stats.map((s) => [s.author?.id, s]));

  const enrichedContributors: EnrichedContributor[] = contributors.map((contributor) => {
    const contributorStats = statsMap.get(contributor.id);

    const { additions, deletions, totalCommits } = contributorStats?.weeks?.reduce(
      (acc, week) => ({
        additions: acc.additions + week.a,
        deletions: acc.deletions + week.d,
        totalCommits: acc.totalCommits + week.c,
      }),
      { additions: 0, deletions: 0, totalCommits: 0 }
    ) ?? { additions: 0, deletions: 0, totalCommits: 0 };

    return { ...contributor, additions, deletions, totalCommits };
  });

  const totalStats = enrichedContributors.reduce(
    (acc, c) => ({
      additions: acc.additions + c.additions,
      deletions: acc.deletions + c.deletions,
      commits: acc.commits + c.totalCommits,
    }),
    { additions: 0, deletions: 0, commits: 0 }
  );

  return (
    <div className={styles.page}>
      <a href="/" className={styles.backLink}>
        Retour
      </a>

      <main className={styles.main}>
        <h1 className={styles.title}>Contributeurs</h1>

        <div className={styles.globalStats}>
          <div className={styles.statBox}>
            <span className={styles.statValue}>{enrichedContributors.length}</span>
            <span className={styles.statLabel}>Contributeurs</span>
          </div>
          <div className={styles.statBox}>
            <span className={styles.statValue}>{formatNumber(totalStats.commits)}</span>
            <span className={styles.statLabel}>Commits</span>
          </div>
          <div className={styles.statBox}>
            <span className={`${styles.statValue} ${styles.additions}`}>{formatNumber(totalStats.additions)}</span>
            <span className={styles.statLabel}>Ajouts</span>
          </div>
          <div className={styles.statBox}>
            <span className={`${styles.statValue} ${styles.deletions}`}>{formatNumber(totalStats.deletions)}</span>
            <span className={styles.statLabel}>Suppressions</span>
          </div>
        </div>

        <div className={styles.grid}>
          {enrichedContributors.map((contributor, index) => (
            <a
              key={contributor.id}
              href={contributor.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.card}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className={styles.avatarContainer}>
                <Image
                  src={contributor.avatar_url}
                  alt={contributor.login}
                  width={80}
                  height={80}
                  className={styles.avatar}
                />
                {index === 0 && <span className={styles.rank}>1</span>}
              </div>
              <h2 className={styles.username}>{contributor.login}</h2>

              <div className={styles.statsGrid}>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>{contributor.totalCommits}</span>
                  <span className={styles.statName}>commits</span>
                </div>
                <div className={styles.stat}>
                  <span className={`${styles.statNumber} ${styles.additions}`}>+{formatNumber(contributor.additions)}</span>
                  <span className={styles.statName}>ajouts</span>
                </div>
                <div className={styles.stat}>
                  <span className={`${styles.statNumber} ${styles.deletions}`}>-{formatNumber(contributor.deletions)}</span>
                  <span className={styles.statName}>suppr.</span>
                </div>
              </div>

              {(contributor.additions > 0 || contributor.deletions > 0) && (
                <div className={styles.ratioBar}>
                  <div
                    className={styles.additionsBar}
                    style={{
                      width: `${(contributor.additions / (contributor.additions + contributor.deletions)) * 100}%`,
                    }}
                  />
                </div>
              )}
            </a>
          ))}
        </div>

        {contributors.length === 0 && (
          <p className={styles.noContributors}>
            Aucun contributeur trouve. Sois le premier !
          </p>
        )}
      </main>
    </div>
  );
}
