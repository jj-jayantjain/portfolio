#!/usr/bin/env python3
"""Assemble fragments/ into final static HTML pages for the portfolio."""
import os

ROOT = os.path.dirname(os.path.abspath(__file__))
FRAG = os.path.join(ROOT, "fragments")

def read(name):
    with open(os.path.join(FRAG, name), encoding="utf-8") as f:
        return f.read()

TEMPLATE = read("page-template.html")
ICONS = read("icons.html")
HEADER = read("header.html")
FOOTER = read("footer.html")

PERSON_SCHEMA = """<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Jayant Jain",
  "jobTitle": "Adobe Experience Cloud Consultant",
  "description": "Adobe Experience Cloud Consultant, Technical Lead and Solution Consultant with 10+ years building on Adobe Experience Manager, Adobe Edge Delivery Services, and Workfront Fusion, including hands-on Generative AI workflow automation.",
  "url": "https://jayantjain.dev/index.html",
  "email": "mailto:hello@jayantjain.dev",
  "sameAs": [
    "https://linkedin.com/in/jayant-jain",
    "https://github.com/jayantjain"
  ],
  "knowsAbout": ["Adobe Experience Manager", "Adobe Edge Delivery Services", "Adobe Workfront Fusion", "OpenAI API", "Java", "JavaScript", "GraphQL"],
  "alumniOf": {
    "@type": "CollegeOrUniversity",
    "name": "UPES Dehradun"
  }
}
</script>"""

PAGES = [
    dict(slug="index.html", title="Jayant Jain — Adobe Experience Cloud Consultant & Technical Lead",
         desc="Adobe Experience Cloud Consultant, Technical Lead & Solution Consultant. 10+ years on AEM, Adobe Edge Delivery Services and Workfront Fusion, with hands-on GenAI automation experience.",
         og="Jayant Jain — Adobe Experience Cloud Consultant", body="body-home.html",
         extra_head=PERSON_SCHEMA, extra_scripts=""),
    dict(slug="about.html", title="About — Jayant Jain",
         desc="Adobe Experience Cloud Consultant Jayant Jain's story — from AEM developer to technical lead, EDS migrations, and GenAI automation.",
         og="About Jayant Jain", body="body-about.html", extra_head="", extra_scripts=""),
    dict(slug="experience.html", title="Experience — Jayant Jain",
         desc="Company-wise professional experience across AEM, Adobe EDS and Workfront Fusion — 8 engagements, 10+ years.",
         og="Experience — Jayant Jain", body="body-experience.html", extra_head="", extra_scripts=""),
    dict(slug="projects.html", title="Projects — Jayant Jain",
         desc="Case studies from 8 enterprise engagements — Adobe EDS migrations, Workfront Fusion GenAI automation, and enterprise commerce. Filter by technology, client or year.",
         og="Projects — Jayant Jain", body="body-projects.html", extra_head="",
         extra_scripts='<script src="js/projects.js"></script>'),
    dict(slug="skills.html", title="Skills — Jayant Jain",
         desc="Adobe Experience Manager, Adobe EDS, Workfront Fusion, Java, JavaScript, OpenAI API and more — categorized skillset with proficiency detail.",
         og="Skills — Jayant Jain", body="body-skills.html", extra_head="", extra_scripts=""),
    dict(slug="clients.html", title="Clients — Jayant Jain",
         desc="Enterprise clients including American University, Abbott, Apple, Lululemon, MG Motors and TLC Digitech.",
         og="Clients — Jayant Jain", body="body-clients.html", extra_head="", extra_scripts=""),
    dict(slug="services.html", title="Services — Jayant Jain",
         desc="Adobe Experience Cloud consulting, AEM development, Adobe EDS migration, Workfront Fusion & GenAI automation, and technical leadership.",
         og="Services — Jayant Jain", body="body-services.html", extra_head="", extra_scripts=""),
    dict(slug="achievements.html", title="Achievements — Jayant Jain",
         desc="Leadership milestones and technical achievements across 8 enterprise engagements on Adobe's stack.",
         og="Achievements — Jayant Jain", body="body-achievements.html", extra_head="", extra_scripts=""),
    dict(slug="certifications.html", title="Certifications — Jayant Jain",
         desc="Adobe, AWS and Scrum certifications and hands-on training on Adobe Edge Delivery Services and Adobe Experience Platform.",
         og="Certifications — Jayant Jain", body="body-certifications.html", extra_head="", extra_scripts=""),
    dict(slug="education.html", title="Education — Jayant Jain",
         desc="B.Tech in Computer Science from UPES Dehradun, plus ongoing continuing education in AWS and GenAI.",
         og="Education — Jayant Jain", body="body-education.html", extra_head="", extra_scripts=""),
    dict(slug="blog.html", title="Blog — Jayant Jain",
         desc="Notes on Adobe Edge Delivery Services, Workfront Fusion automation, GenAI integration and AEM performance.",
         og="Blog — Jayant Jain", body="body-blog.html", extra_head="", extra_scripts=""),
    dict(slug="contact.html", title="Contact — Jayant Jain",
         desc="Get in touch about an AEM migration, Adobe EDS project, Workfront Fusion automation build, or GenAI integration.",
         og="Contact — Jayant Jain", body="body-contact.html", extra_head="", extra_scripts=""),
    dict(slug="resume.html", title="Résumé — Jayant Jain",
         desc="View or download Jayant Jain's résumé — Adobe Experience Cloud Consultant, Technical Lead & Solution Consultant.",
         og="Résumé — Jayant Jain", body="body-resume.html", extra_head="", extra_scripts=""),
]

def build():
    for page in PAGES:
        body = read(page["body"])
        html = (TEMPLATE
                .replace("{{TITLE}}", page["title"])
                .replace("{{DESCRIPTION}}", page["desc"])
                .replace("{{OG_TITLE}}", page["og"])
                .replace("{{SLUG}}", page["slug"])
                .replace("{{EXTRA_HEAD}}", page["extra_head"])
                .replace("{{ICONS}}", ICONS)
                .replace("{{HEADER}}", HEADER)
                .replace("{{BODY}}", body)
                .replace("{{FOOTER}}", FOOTER)
                .replace("{{EXTRA_SCRIPTS}}", page["extra_scripts"]))
        out_path = os.path.join(ROOT, page["slug"])
        with open(out_path, "w", encoding="utf-8") as f:
            f.write(html)
        print("Built", page["slug"], len(html), "bytes")

if __name__ == "__main__":
    build()
