<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep route files thin and compose shared RentPaddy page modules; this preserves the existing visual system across connected journeys.
- Demo state is browser-only, never authoritative access control; production requires server-validated identities and roles before launch.
- Keep backward-compatible URL redirects for original homepage links so existing navigation continues working.

- Keep approved film and app-store sources in brand-config; empty sources must show honest unavailable states, never invented downloads.
- App launch interest stays explicitly browser-only until a real subscription service is connected.
