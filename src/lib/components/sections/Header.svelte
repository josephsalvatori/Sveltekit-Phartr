<script>
import { page } from "$app/stores";
import { Sun, Moon, LogOut } from "lucide-svelte";
import { toggleMode } from "mode-watcher";
import { Button } from "$lib/components/ui/button/index";

export let hidePrivate = false;

let user;

$: user = $page?.data?.user;
</script>

<header class="bg-transparent w-full {(hidePrivate === true) ? "h-0" : ""}">
	<div class="flex justify-between items-center py-4 px-4 {(hidePrivate === true) ? "" : "border-b"}">
		<div class="flex items-center gap-4">
			{#if hidePrivate === false}
				<a href="/" class="font-whitney font-bold text-lg">Home</a>
				<ul>
					<!-- <li><a href="/">home</a></li> -->
				</ul>
			{/if}
		</div>
		<div class="flex items-center gap-4">
			<ul class="flex items-center">
				{#if user}
					<li>
						<Button href="/dashboard" variant="link">Dashboard</Button>
					</li>
					<li>
						<form method="POST" action="/logout">
							<Button type="submit" variant="outline">
								<LogOut class="mr-2 h-4 w-4" />
								Logout
							</Button>
						</form>
					</li>
				{:else}
					<li>
						<Button href="/login" variant="link">
							Login
						</Button>
					</li>
					<li>
						<Button href="/register" variant="link">
							Sign Up
						</Button>
					</li>
				{/if}
			</ul>
			{#if hidePrivate === false}
				<div class="{(hidePrivate === true) ? "absolute top-4 right-4" : ""}">
					<Button type="button" on:click={toggleMode} variant="outline" size="icon">
						<Sun class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
						<Moon class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
						<span class="sr-only">Toggle theme</span>
					</Button>
				</div>
			{/if}
		</div>
	</div>
</header>