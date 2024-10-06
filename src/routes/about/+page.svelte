<script lang="ts">
let features = $state([
	{
		title: 'Intelligent Conversations',
		description: 'Engage in natural, context-aware dialogues on a wide range of topics.'
	},
	{
		title: 'Versatile Knowledge',
		description: 'Access a vast database of information across various fields and disciplines.'
	},
	{
		title: 'Personalized Experience',
		description: 'Enjoy tailored interactions based on your preferences and conversation history.'
	},
	{
		title: 'Continuous Learning',
		description: 'Benefit from an AI that constantly updates its knowledge and improves its capabilities.'
	}
]);
</script>

<div class="container mx-auto px-24 py-12 bg-background text-foreground min-h-screen mt-16">
	
	<h1 class="text-4xl font-bold mb-12 text-center text-primary">About Gaurav AI</h1>

	<section class="mb-16">
		<h2 class="text-2xl font-semibold mb-6 text-primary">Welcome to Gaurav AI</h2>
		<p class="mb-6">
			Discover the power of advanced artificial intelligence with Gaurav AI. Our cutting-edge chatbot is designed to provide intelligent, engaging, and informative conversations on a wide range of topics.
		</p>
		<a href="/chat" class="inline-block px-6 py-3 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors duration-300">
			Try Gaurav AI Now
		</a>
	</section>

	<section class="mb-16">
		<h2 class="text-2xl font-semibold mb-6 text-primary">Key Features</h2>
		<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
			{#each features as feature}
				<div class="bg-card text-card-foreground p-6 rounded-lg shadow-md">
					<h3 class="text-xl font-semibold mb-3">{feature.title}</h3>
					<p>{feature.description}</p>
				</div>
			{/each}
		</div>
	</section>

	<section>
		<h2 class="text-2xl font-semibold mb-6 text-primary">Get Started</h2>
		<p class="mb-6">
			Ready to experience the future of AI-powered conversations? Start chatting with Gaurav AI today and explore the possibilities of intelligent dialogue.
		</p>
		<a href="/chat" class="inline-block px-6 py-3 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors duration-300">
			Start Chatting
		</a>
	</section>
</div>
