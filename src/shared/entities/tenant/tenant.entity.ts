import { TenantPlainObj, TenantSettings } from './tenant.types'

export class Tenant {
  constructor(
    public readonly id: string,
    public readonly slug: string,
    public readonly name: string,
    public readonly status: 'active' | 'trialing' | 'past_due' | 'canceled',
    public readonly settings: TenantSettings,
    public readonly createdAt: string,
    public readonly updatedAt: string
  ) {
    if (!this.isValidSlug(slug)) {
      throw new Error(
        `Invalid tenant slug: "${slug}". Must be lowercase alphanumeric with hyphens.`
      )
    }
  }

  get isActive(): boolean {
    return this.status === 'active' || this.status === 'trialing'
  }

  get isTrialing(): boolean {
    return this.status === 'trialing'
  }

  get branding() {
    return this.settings.branding || {}
  }

  get domain() {
    return this.settings.domain || {}
  }

  get features() {
    return this.settings.features || {}
  }

  hasFeature(featureName: string): boolean {
    return Boolean(this.features[featureName])
  }

  get niche(): string | undefined {
    return this.settings.niche
  }

  private isValidSlug(slug: string): boolean {
    const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
    return slugRegex.test(slug)
  }

  toPlainObj(): TenantPlainObj {
    return {
      id: this.id,
      slug: this.slug,
      name: this.name,
      status: this.status,
      settings: this.settings,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
  }
}
