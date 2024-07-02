<script setup>
const words = ref([''])
const found = ref([''])
const wordsWithLetters = ref([])
const letters = ref({
  g:['','','','',''],
  y:[[''],[''],[''],[''],['']],
  b:['']
})

watch(() => letters.value.b[letters.value.b.length - 1], (newVal) => {
  if (newVal && newVal.trim() !== '') {
    letters.value.b.push('');
  }
}, { immediate: true })

function watch_y(i) {
  watch(() => letters.value.y[i][letters.value.y[i].length - 1], (newVal) => {
    if (newVal && newVal.trim() !== '') {
      letters.value.y[i].push('');
    }
  }, {immediate: true})
}

watch_y(0)
watch_y(1)
watch_y(2)
watch_y(3)
watch_y(4)

onMounted(async () => {
  const response = await fetch('/en_US-large.txt')
  const text = await response.text()
  words.value = text.split(/[\r\n]+/).filter(w => w.length === 5)
})

function reset() {
  letters.value = {
    g:['','','','',''],
    y:[[''],[''],[''],[''],['']],
    b:['']
  },
  found.value = []
  wordsWithLetters.value = []
}

const max_y = computed(() => {
  let max = 0
  for (let i = 0; i < 5; i++){
    if (letters.value.y[i].length > max)
      max = letters.value.y[i].length
  }
  return max
})

const search = () => {
  for (let i = 0; i < 5; i++){
    letters.value.g[i] = letters.value.g[i].trim().slice(0,1).toLowerCase()
    for (let j = 0 ; j < letters.value.y[i].length; j++)
      letters.value.y[i][j] = letters.value.y[i][j].trim().slice(0,1).toLowerCase()
  }
  for(let j = 0; j < letters.value.b.length; j++){
    letters.value.b[j] = letters.value.b[j].trim().slice(0,1).toLowerCase()
  }
  let pattern = letters.value.g.map(l => l ? l : '.').join('')
  let regex = new RegExp(pattern)
  let filtered = words.value.filter(w => regex.test(w.toLowerCase()))
  const wrong = letters.value.b.join('')
  pattern = letters.value.y.map(l => {
    let jl = l.join('') || ''
    return jl || wrong ? `[^${jl}${wrong}]` : '.'
  }).join('');
  regex = new RegExp(pattern)
  filtered = filtered.filter(w => regex.test(w.toLowerCase()))
  filtered = filtered.filter(word => {
    let shuffledLetters = [...letters.value.y.flat().filter(l => l)]
    let availablePositions = letters.value.g.map((l, index) => l ? '' : word[index].toLowerCase())
    return shuffledLetters.every(letter => {
      let index = availablePositions.indexOf(letter)
      if (index === -1) return false
      availablePositions[index] = ''
      return true
    })
  })
  found.value = [...filtered]
  filtered = filtered.map(word => word.toLowerCase())
  for (let i = 0; i < 26; i++){
    const letter = String.fromCharCode(97 + i)
    wordsWithLetters.value[i] = filtered.reduce((acc, word) => {
      return word.includes(letter) ? acc + 1 : acc
    }, 0)
  }
}

const help = 'Fill the matched letters into their corresponding green fields.\nFill the existing, but shuffled letters into the corresponding yellow fields.\nFill the letters that were not matched into the gray fields.\nIf a yellow letter is found and becomes green, remove it from the yellow fields!'
</script>

<template>
  <div class="w-full flex flex-col justify-center items-center">
    <div class="m-2 grid grid-cols-5 gap-2 w-40">
      <input v-for="i in 5" v-model="letters.g[i - 1]" class="bg-green-400 rounded text-center"/>
      <div class="col-span-5">
        <div v-for="i in max_y" class="grid grid-cols-5 gap-2 mb-2">
          <div v-for="j in 5">
            <input v-if="i === 1 || letters.y[j - 1][i - 2]" v-model="letters.y[j - 1][i - 1]" class="w-full bg-yellow-500 rounded text-center"/>
            <div v-else/>
          </div>
        </div>
      </div>
      <input v-for="(letter, index) in letters.b" v-model="letters.b[index]" class="bg-gray-600 rounded text-center"/>
    </div>
    <div class="flex gap-2 p-1">
      <UButton @click="search" color="green" label="Search"/>
      <UTooltip :text="help" :ui="{base: '[@media(pointer:coarse)]:hidden h-[6.5rem] px-2 py-1 text-md font-normal truncate relative whitespace-pre-wrap', width: ''}"><UIcon name="i-heroicons-question-mark-circle" class="h-8 w-8"/></UTooltip>
      <UButton @click="reset" color="red" label="Reset"/>
    </div>
  </div>
  <div class="grid grid-cols-20 gap-2 min-h-[2rem] max-h-[30rem] rounded-xl ring-2 ring-gray-500 overflow-auto mt-2 p-2">
    <div v-for="word of found">{{word}}</div>
  </div>
  <table class="mt-4 m-auto border-collapse border border-gray-500">
    <thead>
      <tr>
        <th v-for="i in 26" class="p-2 border border-gray-500">{{String.fromCharCode(96 + i)}}</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td v-for="amt in wordsWithLetters" class="p-2 border border-gray-500">{{amt}}</td>
      </tr>
    </tbody>
  </table>
</template>