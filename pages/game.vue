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
const goal = ref({})
const answers = ref([{}, {}, {}, {}])
const round = ref(0)
const score = ref(0)
const answered = ref(false)

function shuffleArray(array) {
  return array.sort((a, b) => 0.5 - Math.random())
}

function shuffleAnswers() {
    const shuffled = shuffleArray([...items])
    answers.value = shuffled.slice(0, 4)
    goal.value = answers.value[Math.floor(Math.random() * 4)]
}

onMounted(() => {
    shuffleAnswers()
    initialized.value = true
})

async function selectAnswer(answer) {
    if (answered.value) return
    answered.value = true
    if (answers.value[answer].name === goal.value.name){
        score.value++
        answers.value[answer].color = 'green'
    } else {
        answers.value[answer].color = 'red'
    }
    round.value++
    await new Promise(r => setTimeout(r, 2000))
    answers.value[answer].color = null
    shuffleAnswers()
    answered.value = false
}
</script>

<template>
    <table v-if="initialized">
        <thead>
            <tr>
                <th colspan="2" class="text-2xl font-bold">Which image depicts a {{ goal.name }}?</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td class="p-2"><div>
                    <Image :src="answers[0].image" @selected="selectAnswer(0)" :border-color="answers[0].color" />
                </div></td>
                <td class="p-2"><div>
                    <Image :src="answers[1].image" @selected="selectAnswer(1)" :border-color="answers[1].color"/>
                </div></td>
            </tr>
            <tr>
                <td class="p-2"><div>
                    <Image :src="answers[2].image" @selected="selectAnswer(2)" :border-color="answers[2].color"/>
                </div></td>
                <td class="p-2"><div>
                    <Image :src="answers[3].image" @selected="selectAnswer(3)" :border-color="answers[3].color"/>
                </div></td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <td colspan="2" class="text-xl font-bold text-center">
                    Score: {{ score }}/{{ round }}
                </td>
            </tr>
        </tfoot>
    </table>
</template>