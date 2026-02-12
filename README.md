# Expense-Tracker

This is a project that will showcase my improvement as a cloud engineer

## Infra

Traffic will flow from User -> ALB (public subnet) -> EC2 (public subnet) -> RDS (private subnet)

Route tables are configured to ensure this flow. SGs are created to make sure, everything sees only what it needs to see.

The DB (RDS) lives in a private subnet, so as not to be ping-or reachable through the web, making it more secure this way.

The option to have a NAT gateway is not chosen for this project, because it nees to remain in the free tier. Instead, EC2 runs in the public subnet but has it's own security group.
