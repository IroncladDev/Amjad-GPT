---

sidebar_position: 2

---

# About Usage-Based Billing

There are three types of usage-based billing for deployments: 

1. Outbound Data Transfer
2. Autoscale Compute Units
3. Requests

You can view your usage in your account [here](https://replit.com/account#resource-usage). Billing occurs monthly or once your accumulated costs reach $10. Replit Core (previously Hacker or Pro) users receive monthly allowances for these resources.

<br />

# Deployments

### 1. Deployments Outbound Data Transfer

This type of usage is billed per byte with Replit Core (previously Hacker or Pro) users receiving a monthly allowance. Only egress (outgoing) data is counted against this allowance, potentially leading to overages. In contrast, ingress (incoming) data is always free.

| Subscription | Allowance |
|--------------|-----------|
| Replit Core  | 100 GiB  |

Exceeding your allowance costs $0.10 per GiB. The allowances apply to both Static and Autoscale deployments.

Learn more about [Autoscale](/hosting/deployments/autoscale-deployments) and [Static Deployments](/hosting/deployments/static-deployments).

---
### 2. Compute Units

The runtime for Autoscale Deployments is billed using Compute Units, which consider both CPU and RAM time. Replit Core users (previously Hacker or Pro) receive a monthly allowance:

| Subscription  | Allowance                     |
|---------------|-------------------------------|
| Core          | 6 million Compute Units/month |

Overages are billed at $1 per million Compute Units. The granularity of the billing is down to each individual compute unit ($0.00000125 each).

Here is a breakdown of how RAM and CPU seconds for an Autoscale Deployment translate into Compute Units:

| Resource     | Compute Units | Cost/second         |
|--------------|---------------|----------------------|
| 1 RAM Second | 2 Units       | $0.0000025/second    |
| 1 CPU Second | 18 Units      | $0.0000225/second    |

Static Deployments don't consume Compute Units. Their billing is solely for Outbound Data Transfers beyond a [specified amount](#).

[Learn more about Autoscale Deployments](/hosting/deployments/autoscale-deployments).

---

### 3. Requests

Autoscale Deployments also consider the number of requests made. Here are the monthly allowances for Replit Core (previously Hacker or Pro):

| Subscription  | Allowance                 |
|---------------|---------------------------|
| Replit Core   | 2.5 million requests/month  |

Requests beyond the allowances are billed at $0.40 per million.

<br />
<br />

# Databases

### 1. PostgreSQL Usage Metrics
Replit PostgreSQL offers effortless high availability with no administrative or maintenance burden. Being serverless, Replit PostgreSQL only charges for actual usage, resulting in potential cost savings of up to 10 times.

Replit PostgreSQL databases bill for usage based on the following usage metrics:
- **[Compute Time](#compute-time)**: The amount of compute resources used per hour.
- **[Data Storage](#data-storage)**: The volume of data and history stored.
- **[Data transfer](#data-transfer)**: The volume of data transferred out of.
- **[Written data](#written-data)**: The volume of data written from compute to storage.

<br />

These usage metrics are billed per month or once your accumulated costs reach $10. Replit Core subscribers receive a monthly allowance and pay for any additional overages used. Replit non-plan users just pay for their usage at the listed overage cost.

| Usage Metric                       | Replit Core Allowance | Overage cost                                        |
|------------------------------------|-----------------------|-----------------------------------------------------|
| [Compute Time](#compute-time)      | 100 hours (per month) | $0.102 per additional compute hour per month        |
| [Data Storage](#data-storage)      | 3 GiBs (total)        | $0.12 per additional GiB of storage per month       |
| [Data transfer](#data-transfer)    | 512MiB (per month)    | $0.09 per additional GiB of data transfer per month |
| [Written data](#written-data)      | 512MiB (per month)    | $0.096 per additional GiB of written data per month |

You can view your usage in your account [here](https://replit.com/account#resource-usage).

#### **Compute Time**
Compute time is determined by number of hours your database remains active during a given billing period. Databases are considered active when they receive requests and for an additional 5-minute period after the last request. If a database remains idle for 5 minutes, it will be suspended and enter an inactive state.

#### **Data Storage**
Data storage is the total volume of data stored across all databases in your account, measured in gibibytes (GiB). Storage is calculated as the maximum amount of storage used per month. Each PostgreSQL database consumes 33MB of storage, even if it doesn't contain any data. This is the default storage footprint of the Postgres server. The total storage limit for each database is 10 gibibytes (GiB).

#### **Data Transfer**
Data transfer is the total volume of data transferred out of your database (known as "egress") during a given billing period, measured in gigibytes (GiB). 

#### **Written Data**
Written data measures the total volume of data written from compute to storage within a given billing period, measured in gigibytes (GiB).

[Learn more about Replit PostgreSQL](/hosting/databases/postgresql-on-replit).

<br />

# Additional Notes

If there's an issue with your payment method, we'll notify you. Continuous payment failures might lead to the suspension of your deployments. If this happens, please [contact support](https://support.replit.com) and update your payment details to regain access to our services.