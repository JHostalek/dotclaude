#!/bin/bash
# Stop hook: after every completed turn, force a standalone TLDR in the ## Comms
# register. Deliberate override of the "no trailing recap" prohibition in CLAUDE.md
# (## Comms), opted into by the user.
# Anti-loop: when stop_hook_active is true we are already in the forced continuation,
# so allow the stop instead of blocking again.
input=$(cat)
active=$(echo "$input" | jq -r '.stop_hook_active // false' 2>/dev/null)
if [ "$active" = "true" ]; then
  exit 0
fi
jq -n '{
  decision: "block",
  reason: "TLDR in bullet points wrt to # Comms"
}'
