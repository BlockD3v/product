export const SEO_DEFAULTS = {
	siteName: "pumpEVM.fun",
	siteUrl: "https://pumpevm.fun",
	defaultTitle: "pumpEVM.fun - Create memecoins, make Predictions, and Trade Perpentuals",
	defaultDescription: "Create memecoins, make Predictions, and Trade Perpentuals with Lightning Fast Execution.",
	twitterHandle: "@pumpevm.fun",
	locale: "en_US",
	// meta theme-color needs a literal CSS color value (tag consumer reads from HTML, not CSS vars)
	themeColor: "#54d592",
} as const;

export const SEO_BASE_KEYWORDS = ["pumpEVM.fun", "trading", "dex", "perpetuals", "crypto", "defi"] as const;

export const ROUTE_SEO = {
	TRADE: {
		title: "Trade",
		description:
			"Trade perpetuals and spot markets on pumpEVM.fun with real-time charts, orderbook, and one-click order execution.",
		path: "/",
		keywords: ["trade", "orderbook", "chart", "perpetuals", "spot"],
	},
	PERP: {
		title: "Perpetuals Trading",
		description:
			"Trade perpetual futures on pumpEVM.fun with up to 50x leverage, real-time charts, and advanced order types.",
		path: "/perp",
		keywords: ["perpetuals", "futures", "leverage", "trading"],
	},
	SPOT: {
		title: "Spot Trading",
		description: "Trade spot markets on pumpEVM.fun with real-time orderbook, charts, and instant execution.",
		path: "/spot",
		keywords: ["spot", "trading", "exchange"],
	},
	BUILDERS_PERP: {
		title: "Builder Perpetuals",
		description: "Trade builder-deployed perpetual markets (HIP-3) on pumpEVM.fun.",
		path: "/builders-perp",
		keywords: ["builders", "hip-3", "perpetuals", "community"],
	},
	COMPONENTS: {
		title: "Components",
		description:
			"UI component showcase for pumpEVM.fun design system. Explore buttons, badges, cards, and trading-specific components.",
		path: "/components",
		keywords: ["components", "design system", "ui"],
		noIndex: true,
	},
	NOT_FOUND: {
		title: "Page Not Found",
		description: "The page you are looking for does not exist.",
		path: "/404",
		noIndex: true,
	},
} as const;
