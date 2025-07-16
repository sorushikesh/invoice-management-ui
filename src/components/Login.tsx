import { useState, type ChangeEvent, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiEye, FiEyeOff, FiX } from 'react-icons/fi'

type Props = {
  onLogin: (user: string) => void
  isVisible?: boolean
  onClose: () => void
}

export default function Login({ onLogin, isVisible = true, onClose }: Props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const toggleRotation = showPassword ? 0 : 180

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (email && password) {
      onLogin(email)
      setEmail('')
      setPassword('')
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.5 }}
            className="relative bg-white/90 backdrop-blur-sm shadow-xl rounded-xl p-8 w-full max-w-md"
          >
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
              onClick={onClose}
            >
              <FiX size={20} />
            </button>

            <motion.h1
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-2xl font-bold text-[#1F4C3B] text-center"
            >
              Bilsora – Invoice Management
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-sm text-gray-500 text-center mt-1"
            >
              Smart. Secure. Seamless Invoicing.
            </motion.p>

            <motion.form
              onSubmit={submit}
              className="mt-6 space-y-4"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
            >
              <motion.div
                variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
              >
                <label htmlFor="email" className="block text-sm text-gray-600 mb-1">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                  required
                  className="w-full rounded-md bg-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1F4C3B] text-gray-800 transition-all duration-200"
                />
              </motion.div>

              <motion.div
                className="relative"
                variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
              >
                <label htmlFor="password" className="block text-sm text-gray-600 mb-1">
                  Password
                </label>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                  required
                  className="w-full rounded-md bg-gray-100 px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-[#1F4C3B] text-gray-800"
                />
                <motion.button
                  type="button"
                  animate={{ rotate: toggleRotation }}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600 hover:text-[#1F4C3B]"
                >
                  {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </motion.button>
              </motion.div>

              <motion.div
                variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
              >
                <a href="/forgot-password" className="text-sm text-[#1F4C3B] hover:underline">
                  Forgot Password?
                </a>
              </motion.div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                className="w-full bg-[#1F4C3B] text-white py-2 rounded-md mt-2"
              >
                Login
              </motion.button>

              <motion.div
                className="flex items-center my-4"
                variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
              >
                <div className="flex-grow border-t border-gray-300" />
                <span className="mx-3 text-gray-600 text-sm">or continue with</span>
                <div className="flex-grow border-t border-gray-300" />
              </motion.div>

              <motion.div
                className="flex justify-center space-x-3"
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.1,
                    },
                  },
                }}
              >
                {['Google', 'GitHub', 'Facebook'].map((provider) => (
                  <motion.button
                    key={provider}
                    type="button"
                    aria-label={`Login with ${provider}`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }}
                    className="w-10 h-10 rounded-full border flex items-center justify-center text-gray-600 hover:bg-gray-100"
                  >
                    <span className="text-sm font-bold">{provider[0]}</span>
                  </motion.button>
                ))}
              </motion.div>
            </motion.form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
