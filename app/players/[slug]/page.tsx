"use client"

import { usePlayer } from "../../api/players"
import { Loader } from "../../components/common/Loader"
import { NotFound } from "../../components/common/NotFound"
import Title from "../../components/common/Title"

export interface PlayerPageProps {
  params: {
    slug: string
  }
}

export default function PlayerPage({ params }: PlayerPageProps) {
  const [player, { loading }] = usePlayer(params.slug)

  return (
    <div className="mb-20">
      {loading ? (
        <Loader className="h-44 w-full" />
      ) : !player ? (
        <NotFound
          title="Player not found"
          subtitle="Sorry, we couldn’t find the player you're looking for."
        />
      ) : (
        <div>
          <Title className="mb-8">{player.name}</Title>
        </div>
      )}
    </div>
  )
}
