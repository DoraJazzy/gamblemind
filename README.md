# GAMBLE-MINDED

An interactive web app that teaches the cognitive biases behind gambling behaviour by letting you fall for them first.

**Live site:** [gamblemind.vercel.app](https://gamblemind.vercel.app)

Each bias gets its own hands-on demo rather than a paragraph of explanation. You play a few rounds, notice your own reasoning going wrong, and only then get the explanation — which tends to stick better than being told up front.

Built as an Applied Cognitive Science exam project at Aarhus University.

## Why

Cognitive biases distort how people perceive risk, and in gambling contexts they contribute to impulsive and escalating play. The demos here are drawn from the gambling and decision-making literature, and the site is aimed at casual players, people worried about someone else's gambling, and anyone curious about the psychology behind it.

## The demos

| Bias | What you do | The point |
|---|---|---|
| **Monte Carlo (gambler's) fallacy** | Flip coins one at a time or 100 at once; a live chart tracks heads/tails proportions | Streaks feel meaningful, but each flip stays 50/50. Proportions converge; individual outcomes never become "due" |
| **Near-miss effect** | Spin a 3-reel and a 5-reel machine side by side, five spins each, with fixed outcomes | The 5-reel machine produces far more "so close" results from the same losses — more reels manufacture more near misses |
| **Hot-hand fallacy** | Play a simplified blackjack hand against a dealer | Winning streaks don't make the next hand more likely to win |
| **Loss aversion** | Explore an interactive prospect-theory value function | Losses hurt roughly twice as much as equivalent gains feel good, which distorts chasing behaviour |
| **Base-rate neglect** | Drag events into order from most to least likely | Vivid, specific scenarios feel more probable than they are |
| **Illusion of control** | Roll dice with choices that feel like they matter | Both dice were random the whole time |
| **Ostrich effect** | Confront a running tally of wins and losses | Avoiding your own numbers is what keeps the losses invisible |
| **Rationalization** | Argue with Jackpot Jack, a chatbot playing a cowboy in denial about his gambling | You need three genuinely distinct arguments to get through to him — which is harder than it sounds |

## Tech

- **React 19** bootstrapped with Create React App
- **Recharts** for the coin-flip and prospect-theory charts
- **react-dnd** (HTML5 backend) for the base-rate ranking task
- **react-confetti** and CSS transitions for the slot machine reels and win states
- **Groq SDK** with `llama-3.3-70b-versatile` for the Jackpot Jack chatbot
- Deployed on **Vercel**

## Running locally

```bash
git clone https://github.com/DoraJazzy/gamblemind.git
cd gamblemind
npm install
npm start
```

Opens at `http://localhost:3000`.

The Jackpot Jack demo needs a [Groq](https://console.groq.com) API key. See the note below before you wire one up — the current setup is not one you should copy.

## Known issues

Listed openly because they're real, and fixing them is on the list.

**The Groq API key is exposed.** It is currently hardcoded in `src/Components/rationalization.jsx` with `dangerouslyAllowBrowser: true`. 

**Routing doesn't use a router.** `App.js` switches on `window.location.pathname` and navigation is done by assigning to it, which triggers a full page reload on every click.

**Unused dependencies.** `three`, `@react-three/fiber`, `@react-three/cannon`, `@react-three/drei` and `framer-motion` are in `package.json` but not imported anywhere; they were explored during development.

**Default branch.** The current work lives on `restore-old-state` rather than `main`.

## Feedback

There's a [feedback form](https://forms.gle/kh8fWeVnV1TLV2fd6) linked from the site.
