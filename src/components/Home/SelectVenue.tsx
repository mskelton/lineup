import Alert from "components/common/Alert"
import Button from "components/common/Button"

export interface SelectVenue {
  onSelect(id: string): void
}

export default function SelectVenue({ onSelect }: SelectVenue) {
  return (
    <div>
      <Alert className="mb-6" variant="info">
        Select if you are the home or away team.
      </Alert>

      <div className="flex gap-4">
        <Button className="w-full" onPress={() => onSelect("home")} size="xl">
          Home
        </Button>

        <Button className="w-full" onPress={() => onSelect("away")} size="xl">
          Away
        </Button>
      </div>
    </div>
  )
}
