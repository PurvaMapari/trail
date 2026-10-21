// TRAIL - User Journey Map (Original Backup) - Non-destructive Card Fill
// Rules strictly followed:
// 1. Target only: "TRAIL - User Journey Map (Original Backup)"
// 2. Do not rebuild, move, resize, or delete any existing element
// 3. Do not change the layout or touch any other element
// 4. Fill empty cards with exactly 3 short bullets each (one per line)

(async function main() {
  try {
    console.log("Loading Inter fonts...");
    await figma.loadFontAsync({ family: "Inter", style: "Regular" });
    await figma.loadFontAsync({ family: "Inter", style: "Medium" });
    await figma.loadFontAsync({ family: "Inter", style: "Semi Bold" });
    await figma.loadFontAsync({ family: "Inter", style: "Bold" });

    // 1. Locate the exact backup frame: "TRAIL - User Journey Map (Original Backup)"
    let targetFrame = await figma.getNodeByIdAsync("43:2");
    if (!targetFrame) {
      for (const page of figma.root.children) {
        targetFrame = page.findOne(n => n.name === "TRAIL - User Journey Map (Original Backup)" && n.type === "FRAME");
        if (targetFrame) {
          if (figma.currentPage !== page) {
            figma.currentPage = page;
          }
          break;
        }
      }
    }
    if (!targetFrame) {
      targetFrame = figma.currentPage.findOne(n => n.name.includes("Original Backup") && n.type === "FRAME");
    }
    if (!targetFrame) {
      figma.notify("Could not locate 'TRAIL - User Journey Map (Original Backup)' frame", { error: true });
      return;
    }

    // 2. Find lower-columns or search within targetFrame
    const lowerColumns = targetFrame.findOne(n => n.name === "lower-columns");
    const container = lowerColumns || targetFrame;

    function findCard(cardName) {
      return container.findOne(n => n.name === cardName && n.type === "FRAME");
    }

    function getInnerFrame(card) {
      if (!card) return null;
      const inner = card.findOne(n => n.name === "Frame" && n.type === "FRAME");
      if (inner) return inner;
      return card.children.find(c => c.type === "FRAME");
    }

    // Bullet card data: exactly 3 short bullets each, one per line
    const cardData = [
      {
        cardName: "user-goals-card",
        title: "User Goals",
        bullets: [
          "•  Find new trails easily.",
          "•  Plan a connected route.",
          "•  Discover hidden local spots."
        ]
      },
      {
        cardName: "frustrations-card",
        title: "Frustrations",
        bullets: [
          "•  Generic, disconnected map apps.",
          "•  Long, tedious onboarding.",
          "•  Irrelevant recommendations."
        ]
      },
      {
        cardName: "needs-card",
        title: "Needs",
        bullets: [
          "•  Real-time trail guidance.",
          "•  Personalized suggestions.",
          "•  Quick, simple setup."
        ]
      },
      {
        cardName: "expectations-card",
        title: "Expectations",
        bullets: [
          "•  Seamless navigation between trails.",
          "•  Accurate trail information.",
          "•  Rewarding progress and recaps."
        ]
      },
      {
        cardName: "touchpoints-card",
        title: "Touchpoints",
        bullets: [
          "•  Social media. App store page.",
          "•  Onboarding screen. Trail map.",
          "•  Share card. Push notifications."
        ]
      },
      {
        cardName: "opportunities-card",
        title: "Opportunities for Improvement",
        bullets: [
          "•  Journey-first discovery.",
          "•  Connected trail experience.",
          "•  Active navigation. Recap cards and badges."
        ]
      }
    ];

    // Standard card body text color matching the existing palette (#1F1F1F)
    const textColor = { r: 0.12, g: 0.12, b: 0.12 };

    // Fill each empty card frame
    for (const item of cardData) {
      const card = findCard(item.cardName);
      if (!card) {
        console.warn("Card not found:", item.cardName);
        continue;
      }

      let inner = getInnerFrame(card);
      if (!inner) {
        inner = figma.createFrame();
        inner.name = "Frame";
        inner.x = 16;
        inner.y = 59;
        inner.resize(208, 185);
        inner.fills = [];
        card.appendChild(inner);
      }

      // Configure auto-layout on the inner content area without altering the card bounds
      inner.layoutMode = "VERTICAL";
      inner.itemSpacing = 12;
      inner.paddingLeft = 0;
      inner.paddingRight = 0;
      inner.paddingTop = 0;
      inner.paddingBottom = 0;
      inner.primaryAxisSizingMode = "FIXED";
      inner.counterAxisSizingMode = "AUTO";

      // Clear any temporary content inside this inner frame
      while (inner.children.length > 0) {
        inner.children[0].remove();
      }

      // Add the 3 bullets as separate lines
      for (const bulletText of item.bullets) {
        const t = figma.createText();
        t.fontName = { family: "Inter", style: "Medium" };
        t.fontSize = 11;
        t.lineHeight = { value: 16, unit: "PIXELS" };
        t.fills = [{ type: "SOLID", color: textColor }];
        t.resize(inner.width || 208, 16);
        t.layoutAlign = "STRETCH";
        t.textAutoResize = "HEIGHT";
        t.characters = bulletText;
        inner.appendChild(t);
      }
    }

    // 3. Update Emotion Journey Card
    const emotionCard = findCard("emotion-journey-card");
    if (emotionCard) {
      const emotionInner = getInnerFrame(emotionCard);
      if (emotionInner) {
        const emotionTexts = [
          "01 AWARENESS: Curious.",
          "02 DISCOVERY: Interested.",
          "03 SIGN UP: Cautious.",
          "04 FIRST USE: Expectant.",
          "05 CORE EXPERIENCE: Delighted.",
          "06 OUTCOME: Satisfied.",
          "07 RETENTION: Motivated."
        ];

        const existingTexts = emotionInner.findAll(n => n.type === "TEXT");
        if (existingTexts.length >= 7) {
          for (let i = 0; i < 7; i++) {
            await figma.loadFontAsync(existingTexts[i].fontName);
            existingTexts[i].characters = emotionTexts[i];
          }
        } else {
          emotionInner.layoutMode = "VERTICAL";
          emotionInner.itemSpacing = 8;
          while (emotionInner.children.length > 0) {
            emotionInner.children[0].remove();
          }
          for (let i = 0; i < emotionTexts.length; i++) {
            const et = figma.createText();
            et.name = `Emotion 0${i + 1}`;
            et.fontName = { family: "Inter", style: "Medium" };
            et.fontSize = 10;
            et.lineHeight = { value: 14, unit: "PIXELS" };
            et.fills = [{ type: "SOLID", color: textColor }];
            et.characters = emotionTexts[i];
            et.layoutAlign = "STRETCH";
            et.textAutoResize = "HEIGHT";
            emotionInner.appendChild(et);
          }
        }
      }
    }

    // Select and smoothly center the backup frame on screen
    figma.currentPage.selection = [targetFrame];
    figma.viewport.scrollAndZoomIntoView([targetFrame]);
    figma.notify("TRAIL - User Journey Map (Original Backup) filled successfully!");
  } catch (err) {
    console.error("Execution error:", err);
    figma.notify("Error: " + err.message, { error: true });
  }
})();
