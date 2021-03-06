terraform {
  required_providers {
    google = {
      source = "hashicorp/google"
    }
  }
}

variable "GCP_SA" {}

variable "funcurl" {
  type = string
}

variable "GCP_SA_EMAIL" {
  type = string
}


provider "google" {
  credentials = base64decode(var.GCP_SA)

  project = "fifth-sunup-329021"
  region  = "australia-southeast1"
  zone    = "australia-southeast1-a"
}

resource "google_pubsub_topic" "topic" {
  name = "bau-topic-error"
  message_retention_duration = "86600s"
}

resource "google_pubsub_subscription" "subscriber" {
  name  = "bau-sub-error"
  topic = google_pubsub_topic.topic.name

  ack_deadline_seconds = 20
  message_retention_duration = "604800s"

  retry_policy {
    minimum_backoff = "100s"
  }

}

resource "google_cloud_scheduler_job" "job" {
  name        = "test-job"
  description = "This job is responsible to poll the subscriber every 10 min"
  schedule    = "0/10 * * * *"

  http_target {
    http_method = "GET"
    uri         = "${ var.funcurl }"
    
    oidc_token {
      service_account_email = "pubsub-cf-scheduler-run@fifth-sunup-329021.iam.gserviceaccount.com"
      audience = "${ var.funcurl }"
    }
  }
}
