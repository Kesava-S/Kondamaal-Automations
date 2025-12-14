import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function BookConsultation({ openBookingModal }) {
    const router = useRouter()

    useEffect(() => {
        // Redirect to home with a query param to open the modal
        router.push('/?openModal=true')
    }, [])

    return null
}
