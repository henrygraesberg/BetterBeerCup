import type { FC } from "react"

export type MedalProps = {
  medal: "Gold" | "Silver" | "Bronze"
  className?: string
}

export const Medal: FC<MedalProps> = ({ medal, className }) => {
  const medalClass = {
    Gold: "text-yellow-500",
    Silver: "text-gray-400",
    Bronze: "text-orange-500"
  }[medal]

  const medalEmoji = {
    Gold: "🥇",
    Silver: "🥈",
    Bronze: "🥉"
  }[medal]

  return (
    <p className={`${medalClass} ${className}`}>
      {medalEmoji} {medal}
    </p>
  )
}
