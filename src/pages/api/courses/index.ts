// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import type { NextRequest } from "next/server";

type Data = {
  name: string;
};

const url = "https://api-rest.elice.io/org/academy/course/list";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { count, offset, filter_conditions } = req.query;

  const response = await fetch(
    `${url}/?tab=course&offset=${offset || 0}&count=${
      count || 20
    }&filter_conditions=${filter_conditions || ""}`,
    {
      cache: "no-cache",
    }
  );
  const courseLists = await response.json();
  res.status(200).json(courseLists);
}
