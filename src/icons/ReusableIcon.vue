<template>
    <i :class="computedClasses" :style="iconStyle" :aria-hidden="ariaHidden" :title="title" />
</template>

<script setup lang="ts">
import { computed } from 'vue'

type IconName =
    | 'heart'
    | 'arrow-left'
    | 'arrow-right'
    | 'lightbulb'
    | 'pizza-slice'
    | 'pizza'
    | 'leaf'
    | 'wheat'
    | 'bolt'
    | 'info'
    | 'chevron-left'
    | 'chevron-right'
    | (string & {})

const props = withDefaults(defineProps<{
    name?: IconName
    type?: 'solid' | 'regular' | 'brands'
    color?: string
    size?: string
    className?: string
    title?: string
}>(), {
    name: 'heart',
    type: 'solid',
    color: 'inherit',
    size: '1em',
    className: '',
    title: ''
})

const iconStyle = computed(() => ({
    color: props.color,
    fontSize: props.size
}))

const computedClasses = computed(() => {
    const basePrefix = props.type === 'brands'
        ? 'fa-brands'
        : props.type === 'regular'
            ? 'fa-regular'
            : 'fa-solid'

    const iconMap: Record<string, string> = {
        heart: 'fa-heart',
        'arrow-left': 'fa-arrow-left',
        'arrow-right': 'fa-arrow-right',
        lightbulb: 'fa-lightbulb',
        'pizza-slice': 'fa-pizza-slice',
        pizza: 'fa-pizza-slice',
        leaf: 'fa-leaf',
        wheat: 'fa-wheat-awn',
        bolt: 'fa-bolt',
        info: 'fa-circle-info',
        'chevron-left': 'fa-chevron-left',
        'chevron-right': 'fa-chevron-right'
    }

    const iconClass = iconMap[props.name] ?? props.name

    return [
        basePrefix,
        iconClass,
        props.className
    ].filter(Boolean)
})

const ariaHidden = computed(() => (
    props.title ? undefined : 'true'
))
</script>
