import { useContext } from 'react'
import { useEffect, useState, createContext } from 'react'
import { useLocation } from 'react-router-dom'
import { tokenExists } from './AuthContext'
import { AuthContext } from './AuthContext'

export const SessionContext = createContext()

const SESSION_DURATION = 30 * 60 * 1000 // 30 minutes
const CHECK_INTERVAL = 10 * 1000
const POPUP_COUNTDOWN_SEC = 32
// Valeur de débogue
// const SESSION_DURATION = 8 * 1000
// const CHECK_INTERVAL = 1 * 1000
// const POPUP_COUNTDOWN_SEC = 7

function refreshTokenExists() {
  return !!localStorage.getItem('sessionRefreshStart')
}

function checkSessionTimeout() {
  // Vérification du délai d'inactivité
  const isOver = Date.now() - localStorage.getItem('sessionRefreshStart') >= SESSION_DURATION

  return isOver
}

export function refreshSession() {
  // Vérifie au mouvement de la souris les tokens d'authentification et de popupTimeout
  if (tokenExists() && refreshTokenExists()) {
    localStorage.setItem('sessionRefreshStart', Date.now())
  }
}

export function SessionProvider({ children }) {
  const [refreshCountdown, setRefreshCountdown] = useState(-1)
  const { logOut } = useContext(AuthContext)
  const location = useLocation()

  useEffect(() => {
    if (tokenExists()) {
      // S'il n'y a pas de token de session mais que l'on est authentifié
      if (!refreshTokenExists()) {
        startSession()
      } else {
        // Si le token de refresh est present
        if (checkSessionTimeout()) {
          // Si le tokenSession est perime
          logOut()
        } else {
          // Si le tokenSession est toujours valide
          startSession()
        }
      }
    } else {
      // Supprimer le token de refresh en l'absence du token d'authentif
      localStorage.removeItem('sessionRefreshStart')
    }
  }, [location.pathname])

  function startSession() {
    localStorage.setItem('sessionRefreshStart', Date.now())
    loopSessionTimeout()
  }

  function loopSessionTimeout() {
    setTimeout(() => {
      if (checkSessionTimeout() === false) {
        loopSessionTimeout()
      } else {
        if (tokenExists()) {
          setRefreshCountdown(POPUP_COUNTDOWN_SEC)
        }
      }
    }, CHECK_INTERVAL) // Interval de vérification
  }

  return (
    <SessionContext.Provider
      value={{
        startSession,
        refreshCountdown,
        setRefreshCountdown,
      }}
    >
      {children}
    </SessionContext.Provider>
  )
}