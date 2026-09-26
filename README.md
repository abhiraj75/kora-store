# kora-store

Demo storefront that **RedHanded** (github.com/abhiraj75/RedHanded) acts on.
It contains a deliberately planted pricing bug for the agent to find, prove and fix.

## Run
    npm test                  # existing suite: 7 tests, all pass
    python3 -m http.server 3000
    # open http://localhost:3000/?coupon=SAVE10  -> shows ₹200 (should be ₹1,800)

## Who may change what
| Path | Who may change it |
|---|---|
| `src/` | RedHanded (fixes) |
| `repro/` | RedHanded (one new failing check per issue) |
| `evidence/` | RedHanded (proof bundle per issue) |
| `tests/`, `scripts/`, `package.json`, `.github/` | Humans only. The guard rejects any change. |

## AI tools used
Parts of this repository were drafted with AI assistance (Claude) and reviewed by the team.
