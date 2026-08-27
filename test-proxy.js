async function test() {
  const url = "https://example.com";
  const res = await fetch(`https://r.jina.ai/${url}`);
  const text = await res.text();
  console.log(text.substring(0, 200));
}
test();
