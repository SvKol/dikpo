<script setup>
const fields = ref({
    a: 0,
    b: 0,
    c: 0
})
const results = ref({})

const isChromium = inject('isChromium')

function validate(state) {
    let errors = []
    if (isNaN(state.a)) {
        errors.push({path: 'a', message: 'Not a number!'})
    }
    if (isNaN(state.b)) {
        errors.push({path: 'b', message: 'Not a number!'})
    }
    if (isNaN(state.c)) {
        errors.push({path: 'c', message: 'Not a number!'})
    }
    return errors
}

function formatted(num) {
    return parseFloat(num.toFixed(4))
}

function solve() {
    results.value = {}
    if (!fields.value.a || fields.value.a == 0) {
        results.value.x = formatted(-fields.value.c / fields.value.b)
        console.log(results.value)
    } else {
        let D = Math.pow(fields.value.b, 2) - 4 * fields.value.a * fields.value.c
        if (D < 0) {
            results.value.x1 = formatted(-fields.value.b/(2 * fields.value.a)) + ' + ' + formatted(Math.sqrt(-D)/(2 * fields.value.a)) + 'i'
            results.value.x2 = formatted(-fields.value.b/(2 * fields.value.a)) + ' - ' + formatted(Math.sqrt(-D)/(2 * fields.value.a)) + 'i'
        } else if (D === 0) {
            results.value.x = formatted(-fields.value.b / (2 * fields.value.a))
        } else {
            results.value.x1 = formatted((-fields.value.b + Math.sqrt(D)) / (2 * fields.value.a))
            results.value.x2 = formatted((-fields.value.b - Math.sqrt(D)) / (2 * fields.value.a))
        }
    }
}
</script>

<template>
    <UForm @submit="solve" :state="fields" :validate="validate">
        <UCard>
            <template #header>
                <div class="text-3xl font-bold">Quadratic Equation Solver</div>
            </template>
            <div class="flex gap-2 h-16">
                <UFormGroup name="a" class="w-24">
                    <UInput v-model="fields.a" :autocomplete="isChromium ? 'no-autofill' : 'off'"/>
                </UFormGroup>
                <span>x<sup>2</sup> + </span>
                <UFormGroup name="b" class="w-24">
                    <UInput v-model="fields.b" :autocomplete="isChromium ? 'no-autofill' : 'off'"/>
                </UFormGroup>
                <span>x +</span>
                <UFormGroup name="c" class="w-24">
                    <UInput v-model="fields.c" :autocomplete="isChromium ? 'no-autofill' : 'off'"/>
                </UFormGroup>
                <span> = 0</span>
            </div>
            <div class="mt-1 py-1 px-4 rounded ring-green-500 ring-1 h-8">
                <div v-if="results.x !== undefined">
                    x = {{results.x}}
                </div>
                <div v-else-if="results.x1 !== undefined && results.x2 !== undefined" class="flex justify-between">
                    <div>
                        x<sub>1</sub> = {{results.x1}}
                    </div>
                    <div>
                        x<sub>2</sub> = {{results.x2}}
                    </div>
                </div>
            </div>
            <template #footer>
                <div class="flex justify-center">
                    <UButton type="submit">Solve</UButton>
                </div>
            </template>
        </UCard>
    </UForm>
</template>