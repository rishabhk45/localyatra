/**
 * LocalYatra — Coming Soon View
 * Friendly fallback view for routes scheduled in upcoming hackathon phases.
 */

export function renderComingSoon(routeName, phaseTitle, description) {
  return `
    <div class="container-sm" style="text-align: center; padding: var(--space-8) var(--space-4);">
      <div style="margin-bottom: var(--space-4);">
        <span class="badge badge-demo">Demo / Simulated Prototype</span>
      </div>
      <h1 style="font-size: var(--font-2xl); color: var(--color-primary); margin-bottom: var(--space-2);">
        ${routeName}
      </h1>
      <p style="font-size: var(--font-lg); font-weight: 600; color: var(--color-accent); margin-bottom: var(--space-4);">
        Scheduled for ${phaseTitle}
      </p>
      <div class="card" style="margin-bottom: var(--space-6); text-align: left;">
        <p style="color: var(--color-text-muted); line-height: 1.6;">
          ${description || 'This feature module will be unlocked in an upcoming phase. All UI components, state schemas, and design systems are established and ready.'}
        </p>
        <div style="margin-top: var(--space-4); padding: var(--space-3); background-color: var(--color-surface-variant); border-radius: var(--radius-md);">
          <strong>Current Active Milestone:</strong> Phase 1 (Design System & App Shell). Explore the live design tokens and component showcase in the Styleguide.
        </div>
      </div>
      <div style="display: flex; gap: var(--space-3); justify-content: center; flex-wrap: wrap;">
        <a href="#/" class="btn btn-primary">← Back to Home</a>
        <a href="#/styleguide" class="btn btn-secondary">Explore Styleguide</a>
      </div>
    </div>
  `;
}
