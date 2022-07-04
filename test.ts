import DetaUploader from "./src/uploaders/deta";

const u = new DetaUploader("test", {
  projectKey: "c0q1waih_Z9ZRzeGgU3YoaafaswS6ygUf3E2596uB",
});
console.log(await u.list());
