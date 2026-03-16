import { NextResponse } from "next/server";

const LEETCODE_USERNAME = "yididiyakebede";

const LEETCODE_GRAPHQL = "https://leetcode.com/graphql";

const query = `
  query getUserProfile($username: String!) {
    matchedUser(username: $username) {
      username
      profile {
        ranking
      }
      submitStats: submitStatsGlobal {
        acSubmissionNum {
          difficulty
          count
        }
      }
    }
    allQuestionsCount {
      difficulty
      count
    }
  }
`;

export async function GET() {
  try {
    const res = await fetch(LEETCODE_GRAPHQL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Referer: "https://leetcode.com",
      },
      body: JSON.stringify({
        query,
        variables: { username: LEETCODE_USERNAME },
      }),
      next: { revalidate: 3600 },
    });

    if (!res.ok) throw new Error(`LeetCode API error: ${res.status}`);

    const json = await res.json();
    const user = json?.data?.matchedUser;
    const allCounts: { difficulty: string; count: number }[] =
      json?.data?.allQuestionsCount ?? [];

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const acStats: { difficulty: string; count: number }[] =
      user.submitStats?.acSubmissionNum ?? [];

    const get = (diff: string) =>
      acStats.find((s) => s.difficulty === diff)?.count ?? 0;
    const total = (diff: string) =>
      allCounts.find((s) => s.difficulty === diff)?.count ?? 0;

    return NextResponse.json({
      username: user.username,
      ranking: user.profile?.ranking ?? 0,
      totalSolved: get("All"),
      totalQuestions: total("All"),
      easySolved: get("Easy"),
      totalEasy: total("Easy"),
      mediumSolved: get("Medium"),
      totalMedium: total("Medium"),
      hardSolved: get("Hard"),
      totalHard: total("Hard"),
    });
  } catch (err) {
    console.error("LeetCode fetch error:", err);
    return NextResponse.json(
      { error: "Failed to fetch LeetCode data" },
      { status: 500 }
    );
  }
}
