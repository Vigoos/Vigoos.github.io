import { ref } from 'vue'

export const useNotification = () => {
  const notification = ref({ show: false, message: '' })

  const showNotification = (message) => {
    notification.value = { show: true, message }
    setTimeout(() => {
      notification.value.show = false
    }, 3000)
  }

  return { notification, showNotification }
}
