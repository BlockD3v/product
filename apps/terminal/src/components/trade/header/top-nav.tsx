import { Button, ButtonIcon, Divider } from "@hypeterminal/ui";
import { t } from "@lingui/core/macro";
import { Trans } from "@lingui/react/macro";
import { DownloadSimpleIcon, GearIcon } from "@phosphor-icons/react";
import { Link } from "@tanstack/react-router";
import { Suspense } from "react";
import { useConnection } from "wagmi";
import { APP_BAR_BUTTON_HEIGHT_CLASS, APP_HEADER_HEIGHT_CLASS } from "@/config/layout";
import { SCOPE_NAV_ITEMS } from "@/config/nav";
import { cn } from "@/lib/cn";
import { createLazyComponent } from "@/lib/lazy";
import { useExchangeScope } from "@/providers/exchange-scope";
import { useDepositModalActions, useSettingsDialogActions } from "@/stores/use-global-modal-store";
import { useIsTestnet } from "@/stores/use-global-settings-store";
import { ThemeToggle } from "./theme-toggle";

const UserMenu = createLazyComponent(() => import("./user-menu"), "UserMenu");

function getScopeAccentClass(scope: string): string {
	switch (scope) {
		case "perp":
			return "border-scope-perp/40";
		case "spot":
			return "border-scope-spot/40";
		case "builders-perp":
			return "border-scope-builders/40";
		default:
			return "border-stroke-weak";
	}
}

export function TopNav() {
	const { open: openDepositModal } = useDepositModalActions();
	const { open: openSettingsDialog } = useSettingsDialogActions();
	const { isConnected } = useConnection();
	const { scope } = useExchangeScope();
	const isTestnet = useIsTestnet();

	const accentClass = getScopeAccentClass(scope);

	return (
		<header
			className={cn(
				APP_HEADER_HEIGHT_CLASS,
				"fixed left-0 right-0 z-40 border-b border-stroke-weak px-3 flex items-center justify-between bg-background transition-colors duration-300 ease-in-out",
				isTestnet ? "top-8" : "top-0",
				accentClass,
			)}
		>
			{/* Left section: Logo + scope nav items (Perp, Spot, Builders) */}
			<div className="flex items-center gap-3 min-w-0">
				<div className="flex items-center gap-1.5">
					<img src="/icon.svg" alt="pumpEVM.fun" className="size-5" />
					<span className="text-xs font-bold tracking-tight text-fg">pumpEVM.fun</span>
				</div>
				<Divider orientation="vertical" className="my-2 hidden lg:block" />
				<nav className="hidden lg:flex items-center text-xs tracking-wide">
					{SCOPE_NAV_ITEMS.map((item) => (
						<Link
							key={item.scope}
							to={item.to}
							className={cn(
								"px-2.5 py-1 rounded-8 transition-colors duration-150 relative",
								"after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-brand after:transition-all after:duration-300",
								scope === item.scope ? item.activeClass : "text-fg-muted hover:text-fg hover:after:w-full",
							)}
						>
							{item.label}
						</Link>
					))}
				</nav>
			</div>

			{/* Middle section: Centered custom links with hover underline */}
			<div className="hidden lg:flex items-center justify-center flex-1 gap-2 text-xs tracking-wide">
				<a
					href="https://app.pumpevm.fun"
					target="_blank"
					rel="noopener noreferrer"
					className={cn(
						"px-2.5 py-1 rounded-8 relative",
						"text-fg-muted hover:text-fg transition-colors duration-150",
						"after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-brand after:transition-all after:duration-300",
						"hover:after:w-full",
					)}
				>
					Launchpad
				</a>
				<a
					href="https://trade.pumpevm.fun"
					target="_blank"
					rel="noopener noreferrer"
					className={cn(
						"px-2.5 py-1 rounded-8 relative",
						"text-fg-muted hover:text-fg transition-colors duration-150",
						"after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-brand after:transition-all after:duration-300",
						"hover:after:w-full",
					)}
				>
					Trade x50
				</a>
				<span className="px-2.5 py-1.5 text-fg-disabled cursor-not-allowed" tabIndex={-1}>
					Prediction
				</span>
			</div>

			{/* Right section: Deposit, user menu, theme toggle, settings */}
			<div className="flex items-center gap-2 min-h-8">
				{isConnected && (
					<Button
						variant="filled"
						intent="brand"
						size="sm"
						onClick={() => openDepositModal("deposit")}
						iconLeft={<DownloadSimpleIcon className="size-3.5" />}
						className={cn(APP_BAR_BUTTON_HEIGHT_CLASS, "shrink-0 px-3")}
					>
						<Trans>Deposit</Trans>
					</Button>
				)}
				<Suspense fallback={<UserMenuSkeleton />}>
					<UserMenu />
				</Suspense>
				<ThemeToggle />
				<ButtonIcon
					variant="ghost"
					intent="neutral"
					className="size-8 shrink-0"
					onClick={openSettingsDialog}
					aria-label={t`Settings`}
				>
					<GearIcon className="size-4" />
				</ButtonIcon>
			</div>
		</header>
	);
}

function UserMenuSkeleton() {
	return <div className={cn(APP_BAR_BUTTON_HEIGHT_CLASS, "h-8 w-32 shrink-0 rounded-8 bg-surface animate-pulse")} />;
}
