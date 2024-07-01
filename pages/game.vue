<script setup>
const items = [
    { name: 'house', image: '/house.webp' },
    { name: 'cat', image: '/cat.jpg' },
    { name: 'dog', image: '/dog.jpg' },
    { name: 'helicopter', image: '/helicopter.jpg' },
    { name: 'car', image: '/car.jpeg' },
    { name: 'parrot', image: '/parrot.jpg' },
    { name: 'wolf', image: '/wolf.jpg' },
    { name: 'fox', image: '/fox.jpg' },
    { name: 'mountain', image: '/mountain.jpg' },
    { name: 'whale', image: '/whale.jpg' },
    { name: 'cake', image: '/cake.webp' },
    { name: 'donkey', image: '/donkey.jpg' },
    { name: 'eagle', image: '/eagle.jpg' },
    { name: 'apple', image: '/apple.jpg' },
    { name: 'bicycle', image: '/bicycle.jpeg' },
    { name: 'catfish', image: '/catfish.jpg' },
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
            Which image depicts a{{ /^[aieou].+$/g.test(items[goal].name) ? `n ${items[goal].name}` : ` ${items[goal].name}` }}?
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