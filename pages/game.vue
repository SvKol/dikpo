<script setup>
const items = [
    {
        name: 'house',
        image: '/house.webp',
        color: null
    },
    {
        name: 'cat',
        image: '/cat.jpg',
        color: null
    },
    {
        name: 'dog',
        image: '/dog.jpg',
        color: null
    },
    {
        name: 'helicopter',
        image: '/helicopter.jpg',
        color: null
    },
    {
        name: 'car',
        image: '/car.jpeg',
        color: null
    },
    {
        name: 'parrot',
        image: '/parrot.jpg',
        color: null
    },
    {
        name: 'wolf',
        image: '/wolf.jpg',
        color: null
    },
    {
        name: 'fox',
        image: '/fox.jpg',
        color: null
    },
    {
        name: 'mountain',
        image: '/mountain.jpg',
        color: null
    },
    {
        name: 'whale',
        image: '/whale.jpg',
        color: null
    }
]

const initialized = ref(false)
const goal = ref(-1)
const answers = ref(new Set())
const round = ref(0)
const score = ref(0)
const answered = ref(false)
const colors = ref([])

function shuffleAnswers() {
    answers.value.clear()
    const cache = goal.value
    goal.value = -1
    while (answers.value.size < 4) {
        let idx = Math.floor(Math.random() * items.length)
        if (goal.value < 0 && idx !== cache) goal.value = idx
        answers.value.add(idx)
    }
    console.log(answers.value)
}

onMounted(() => {
    shuffleAnswers()
    initialized.value = true
})

async function selectAnswer(answer) {
    if (answered.value) return
    answered.value = true
    if (answer === goal.value) {
        score.value++
        colors.value[answer] = 1
    } else {
        colors.value[answer] = -1
    }
    round.value++
    await new Promise(r => setTimeout(r, 1500))
    colors.value[answer] = 0
    shuffleAnswers()
    answered.value = false
}
</script>

<template>
    <div v-if="initialized">
        <div class="text-2xl font-bold">
            Which image depicts a {{ items[goal].name }}?
        </div>
        <div class="grid grid-cols-2 gap-2">
            <template v-for="(item, index) in items" :key="index">
                <Image v-if="answers.has(index)" v-model="colors[index]" :src="item.image" @selected="selectAnswer(index)"/>
            </template>
        </div>
        <div class="text-xl font-bold text-center">
            Score: {{ score }}/{{ round }}
        </div>
    </div>
</template>