<script setup>
const route = useRoute()

const links = [{
    label: 'Home',
    icon: 'i-heroicons-home',
    to: '/'
}, {
    label: 'About',
    icon: 'i-heroicons-information-circle',
    to: '/about'
}, {
    label: 'Quadratic Equation Solver',
    icon: 'i-heroicons-calculator',
    to: '/quadratic'
}, {
    label: 'Game',
    icon: 'i-heroicons-puzzle-piece',
    to: '/game'
}, {
    label: 'Wordle Helper',
    icon: 'i-heroicons-newspaper',
    to: '/wordle'
}]

</script>

<template>
    <UHorizontalNavigation :links="links" class="border-b border-gray-200 dark:border-gray-800"/>
    <div class="flex w-full justify-center h-[calc(100vh-4.75rem)] items-center overflow-y-auto">
        <div>
            <slot/>
        </div>
    </div>
</template>