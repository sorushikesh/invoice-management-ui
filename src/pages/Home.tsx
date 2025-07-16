import Layout from '../components/Layout'
import LoginChatSwitcher from '../components/LoginChatSwitcher'

interface Props {
  readonly onLogin: (user: string) => void
}

export default function Home({ onLogin }: Props) {
  return (
    <Layout>
      <LoginChatSwitcher onLogin={onLogin} />
    </Layout>
  )
}
