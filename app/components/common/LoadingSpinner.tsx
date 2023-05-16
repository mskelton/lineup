export function LoadingSpinner(props: React.SVGAttributes<SVGSVGElement>) {
  return (
    <svg
      fill="none"
      viewBox="0 0 230 230"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle
        className="opacity-25"
        cx="115"
        cy="115"
        r="100"
        stroke="currentColor"
        strokeWidth="30"
      />

      <path
        className="origin-center animate-spin"
        d="M230 115C230 106.716 223.284 100 215 100C206.716 100 200 106.716 200 115C200 161.944 161.944 200 115 200C114.873 200 114.747 200.002 114.621 200.005C98.0011 199.875 81.2476 194.882 66.6036 184.628C59.8176 179.876 50.4644 181.525 45.7127 188.312C40.9611 195.098 42.6103 204.451 49.3964 209.202C101.423 245.632 173.131 232.988 209.56 180.961C210.177 180.08 210.687 179.155 211.09 178.203C223.044 160.066 230 138.346 230 115Z"
        fill="currentColor"
      />
    </svg>
  )
}
