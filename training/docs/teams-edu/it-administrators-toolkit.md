---
sidebar_position: 27
---

# IT Administrator's Toolkit

If you are new to Teams for Education, this page will help ensure Replit runs smoothly for you and your team. You may want to send this page to your technology team or IT department.

Read more about [our commitment to user safety](https://docimg.replit.com/images/teamsForEducation/Our%20Commitment%20to%20User%20Safety.pdf).

## Recommended option: full Replit experience

To make sure Replit works for you and your students on your school network, you need to ensure the following domains are whitelisted/unblocked:

- `*.replit.com` (primary domain)
- `*.repl.co` (where web applications built on Replit are hosted)
- `*.repl.it` (old domain, not actively used)
- `*.replitusercontent.com` (old domain, not actively used)
- `*.cdn.replit.com`

Clients must be able to access all subdomains of the above domains. The specific hosts that clients communicate with under the above names are subject to change without notice.

We block objectionable and NSFW content by default. You can read more about this [on our blog](https://blog.replit.com/family-friendly-dns).

## Alternative 1: lite filtering mode

To block access to webpages through Replit, you may block `repl.co` **only**, but this will impact students' ability to run and preview HTML projects. In most cases, alternative 2 below is a better option for schools, because HTML projects are supported, while being firewalled from the larger Internet.

## Alternative 2: firewalled mode

For schools who find that their students are still accessing third-party proxy websites or other undesirable content using Replit, and desire a simple solution to prevent this, we offer an alternative domain, `firewalledreplit.com`. When Replit is accessed using this domain, a firewall is used to prevent repls from accessing the Internet, and Replit’s community features are hidden. More information about this alternative option is given in [this blog post](https://blog.replit.com/computing-superpower-at-school) and [this FAQ](/firewalled-replit/firewalled-replit-faq).

To use this alternative option, please ensure that the following domains are whitelisted/unblocked:

- `*.firewalledreplit.com`
- `*.firewalledreplit.co`
- `*.cdn.replit.com`

Clients must be able to access all subdomains of the above domains. The specific hosts that clients communicate with under the above names are subject to change without notice.

If it is also desired to limit students from logging in and using replit from our main domain, then you may block each of the domains listed in the “Recommended option” section above.

## Protocols

The Replit application is delivered over the following protocols:

- HTTPS (for all web pages)
- WebSocket over HTTPS
- VNC (for running graphical applications in a browser)

## Data Retention and Usage

Please refer to our [Privacy FAQs](/teams-edu/privacy-faq) and [US Student Data Protection Addendum](/teams-edu/us-student-dpa) for more details.
