const glob = require("glob");
const fs = require("fs");
const { CharacterTextSplitter } = require("langchain/text_splitter");
const { HNSWLib } = require("langchain/vectorstores");
const { OpenAIEmbeddings } = require("langchain/embeddings");

(async () => {
  const data = [];
  const files = await new Promise((resolve, reject) =>
    glob("training/**/*.md", (err, files) =>
      err ? reject(err) : resolve(files)
    )
  );

  for (const file of files) {
    data.push(fs.readFileSync(file, "utf-8"));
  }

  console.log(
    `Added ${files.length} files to data.  Splitting text into chunks...`
  );

  const textSplitter = new CharacterTextSplitter({
    chunkSize: 2000,
    separator: "\n",
  });

  let docs = [];
  for (const d of data) {
    const docOutput = textSplitter.splitText(d);
    docs = [...docs, ...docOutput];
  }

  console.log("Initializing Store...");

  const store = await HNSWLib.fromTexts(
    docs,
    docs.map((_, i) => ({ id: i })),
    new OpenAIEmbeddings()
  );

  console.clear();
  console.log("Saving Vectorstore");

  store.save("vectorStore");

  console.clear();
  console.log("VectorStore saved");
})();
