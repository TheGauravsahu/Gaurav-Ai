<script lang="ts">
	import { SendHorizontal } from 'lucide-svelte';
	import { onMount, tick } from 'svelte';
	import { marked } from 'marked';

	interface Message {
		content: string;
		isUser: boolean;
		html?: string;
	}

	let chatContainer: HTMLDivElement;
	let loading = $state(false);

	let prompt = $state('');
	let messages = $state<Message[]>([]);

	onMount(() => {
		scrollToBottom();
	});

	async function scrollToBottom() {
		await tick();
		if (chatContainer) {
			chatContainer.scrollTop = chatContainer.scrollHeight;
		}
	}

	$effect(() => {
		if (messages.length > 0) {
			scrollToBottom();
		}
	});

	async function handleSubmit() {
		if (!prompt.trim()) return;

		try {
			loading = true;
			const userMessage = { content: prompt, isUser: true };
			messages = [...messages, userMessage];

			const currentPrompt = prompt;
			prompt = '';

			const req = await fetch('/ai', {
				method: 'POST',
				body: JSON.stringify({ prompt: currentPrompt }),
				headers: {
					'content-type': 'application/json'
				}
			});

			const { response } = await req.json();

			const htmRes = await marked(response);

			const aiMessage: Message = {
				content: response,
				isUser: false,
				html: htmRes
			};
			messages = [...messages, aiMessage];
			await scrollToBottom();
		} catch (error) {
			console.error(error);
			messages = [...messages, { content: 'Sorry, an error occurred.', isUser: false }];
		} finally {
			loading = false;
			await scrollToBottom();
		}
	}
</script>

<section class="h-screen bg-gray-700">
	{#if messages.length > 0}
	<div bind:this={chatContainer} class="max-w-6xl mx-auto h-[80%] mt-16 overflow-y-auto">
		<div class="space-y-4 p-4">
			{#each messages as message}
				<div class={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
					<div
						class={`max-w-[70%] rounded-lg p-3 ${
							message.isUser ? 'bg-blue-500 text-white' : 'bg-gray-800 text-white'
						}`}
					>
						{@html message.html || message.content}
					</div>
				</div>
			{/each}
			{#if loading}
				<div class="flex justify-start">
					<div class="max-w-[70%] rounded-lg p-3 bg-gray-800 text-white">
						<span class="loading-dots">...</span>
					</div>
				</div>
			{/if}
		</div>
	</div>
	{:else}
		<div class="flex justify-center items-center h-full">
			<h1 class="text-4xl font-bold text-white">Welcome to Gaurav AI</h1>
		</div>
	{/if}

	<div class="fixed bottom-0 left-1/2 -translate-x-1/2 right-0 p-4 w-[80%]">
		<form onsubmit={handleSubmit} class="flex items-center">
			<input
				type="text"
				bind:value={prompt}
				placeholder="Type your message..."
				class="flex-grow p-2 pl-2 rounded-l-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
			/>
			<button
				type="submit"
				disabled={loading}
				class="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
			>
				<SendHorizontal />
			</button>
		</form>
	</div>
</section>

<style>
	.loading-dots::after {
		content: '...';
		animation: dots 1s steps(5, end) infinite;
	}

	@keyframes dots {
		0%,
		20% {
			color: rgba(0, 0, 0, 0);
			text-shadow:
				0.25em 0 0 rgba(0, 0, 0, 0),
				0.5em 0 0 rgba(0, 0, 0, 0);
		}
		40% {
			color: white;
			text-shadow:
				0.25em 0 0 rgba(0, 0, 0, 0),
				0.5em 0 0 rgba(0, 0, 0, 0);
		}
		60% {
			text-shadow:
				0.25em 0 0 white,
				0.5em 0 0 rgba(0, 0, 0, 0);
		}
		80%,
		100% {
			text-shadow:
				0.25em 0 0 white,
				0.5em 0 0 white;
		}
	}

	::-webkit-scrollbar {
		display: none;
	}

	.scrollbar-hide {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}

	.scrollable {
		overflow-y: scroll;
	}
</style>
