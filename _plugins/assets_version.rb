# frozen_string_literal: true

# Sets site.config["assets_version"] from ENV or default.
Jekyll::Hooks.register :site, :after_init do |site|
  site.config["assets_version"] = ENV["ASSETS_VERSION"] || site.config["assets_version"] || "1.0.0"
end
