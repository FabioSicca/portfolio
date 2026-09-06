terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.0"
    }
  }

  required_version = ">= 1.0"
}

provider "aws" {
  region = "sa-east-1"
}

resource "aws_s3_bucket" "portfolio" {
  bucket = "portfolio-fs"

  tags = {
    portfolio = "portfolio"
  }
}

resource "aws_s3_bucket_policy" "portfolio" {
  bucket = aws_s3_bucket.portfolio.id

  policy = jsonencode({
    Version = "2012-10-17"

    Statement = [
      {
        Sid    = "AllowCloudFrontServicePrincipal"
        Effect = "Allow"

        Principal = {
          Service = "cloudfront.amazonaws.com"
        }

        Action   = "s3:GetObject"
        Resource = "${aws_s3_bucket.portfolio.arn}/*"

        Condition = {
          StringEquals = {
            "AWS:SourceArn" = "arn:aws:cloudfront::497077635613:distribution/EKE7V2JKL8FNV"
          }
        }
      }
    ]
  })
}

resource "aws_cloudfront_origin_access_control" "portfolio" {
  name                              = "oac-portfolio-fs.s3.sa-east-1.amazonaws.com-mtow9erjoto"
  description                       = "Created by CloudFront"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

resource "aws_cloudfront_distribution" "portfolio" {
  enabled             = true
  default_root_object = "index.html"
  price_class         = "PriceClass_All"

  origin {
    domain_name              = aws_s3_bucket.portfolio.bucket_regional_domain_name
    origin_id                = "portfolio-fs.s3.sa-east-1.amazonaws.com-mtow7d40csc"
    origin_access_control_id = aws_cloudfront_origin_access_control.portfolio.id

    connection_attempts = 3
    connection_timeout  = 10
  }

  default_cache_behavior {
    target_origin_id       = "portfolio-fs.s3.sa-east-1.amazonaws.com-mtow7d40csc"
    viewer_protocol_policy = "redirect-to-https"

    allowed_methods = ["GET", "HEAD"]
    cached_methods  = ["GET", "HEAD"]

    cache_policy_id = "658327ea-f89d-4fab-a63d-7e88639e58f6"

    compress = true
  }

  custom_error_response {
    error_code         = 403
    response_page_path = "/index.html"
    response_code      = 200
    error_caching_min_ttl = 0
  }

  custom_error_response {
    error_code         = 404
    response_page_path = "/index.html"
    response_code      = 200
    error_caching_min_ttl = 0
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }

  web_acl_id = "arn:aws:wafv2:us-east-1:497077635613:global/webacl/CreatedByCloudFront-d2087326/c83e1dfb-fead-43d5-87ff-e6df10423c2c"

  http_version = "http2"
  is_ipv6_enabled = true

  tags = {
    Name = "portfolio-fs"
  }
}