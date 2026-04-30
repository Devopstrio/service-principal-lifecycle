module "identity_db" {
  source = "./modules/database"

  db_name = "service_principal_metadata"
}

module "rotation_queue" {
  source = "./modules/redis"

  cluster_mode = false
}

module "identity_monitoring" {
  source = "./modules/monitoring"

  retention_days = 180
}

resource "kubernetes_namespace" "identity_system" {
  metadata {
    name = "platform-identity"
    labels = {
      "platform.ops/managed" = "true"
    }
  }
}

resource "kubernetes_config_map" "identity_configs" {
  metadata {
    name      = "principal-lifecycle-configs"
    namespace = kubernetes_namespace.identity_system.metadata[0].name
  }

  data = {
    "rotation-days"      = "90"
    "max-age-days"       = "180"
    "risk-threshold"     = "70"
    "least-privilege"    = "true"
  }
}
