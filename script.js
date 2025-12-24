const CHANNEL_ID = "UCxxxxxxxxxxxx"; // apna real channel id yahan
const feedURL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

fetch(`https://api.rss2json.com/v1/api.json?rss_url=${feedURL}`)
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("videos");

    data.items.slice(0, 9).forEach(video => {
      container.innerHTML += `
        <div class="card">
          <img src="${video.thumbnail}" alt="${video.title}">
          <h3>${video.title}</h3>
          <p>${video.description.substring(0,120)}...</p>
          <a href="${video.link}" target="_blank">Watch on YouTube</a>
        </div>
      `;
    });
  })
  .catch(err => {
    document.getElementById("videos").innerHTML =
      "<p style='text-align:center'>Videos load nahi ho pa rahe.</p>";
    console.error(err);
  });
