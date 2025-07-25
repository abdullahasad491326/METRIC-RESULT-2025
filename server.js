const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/lookup', async (req, res) => {
  try {
    const rebtelRes = await fetch("https://prod-mp.rebtel.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "application 7443a5f6-01a7-4ce7-8e87-c36212fad4f5",
        "Origin": "https://www.rebtel.com"
      },
      body: JSON.stringify(req.body)
    });

    const data = await rebtelRes.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Proxy error", details: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Proxy server is running on port ${PORT}`);
});
