import { mockApplications } from "~~/server/mocks/applications";

export default defineEventHandler(async (event) => {
  console.log("download start..");
  await new Promise((answer) => setTimeout(answer, 1000)); // проосто для имитации задержки к бд
  console.log("download complete!");
  const drafts = mockApplications.filter((app) => app.status === "draft");
  return drafts;
});
