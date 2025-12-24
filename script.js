const CHANNEL_ID = "YOUR_CHANNEL_ID";
const GEMINI_API_KEY = "YOUR_GEMINI_API_KEY";

const feedURL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

fetch(`https://api.rss2json.com/v1/api.json?rss_url=${feedURL}`)
.then(res => res.json())
.then(data => {
  const container = document.getElementById("videos");

  data.items.slice(0,6).forEach(video => {

    fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text:
              `Is YouTube video ka short Hinglish summary likho (2–3 lines, simple words):\n
               Title: ${video.title}\n
               Description: ${video.description}`
            }]
          }]
        })
      }
    )
    .then(res => res.json())
    .then(ai => {
      const summary =
        ai.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Summary load ho rahi hai...";

      container.innerHTML += `
        <div class="card">
          <iframe src="${video.link.replace("watch?v=","embed/")}"></iframe>
          <h3>${video.title}</h3>
          <p>${summary}</p>
        </div>
      `;
    });

  });
});
