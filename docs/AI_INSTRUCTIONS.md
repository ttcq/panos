# AI Instructions

## Purpose

This document defines the software engineering rules for AI assistants working on the Explore project.

These instructions apply to all implementation work unless explicitly overridden by the Project Owner.

---

This document has precedence over implementation preferences.

# Roles

Chief Curator
- Defines the product vision.
- Approves features.
- Makes final decisions.

Chief Software Architect (ChatGPT)
- Owns the software architecture.
- Owns documentation.
- Reviews implementations.
- Approves architectural changes.

Implementation Engineer (Claude Code)
- Implements approved sprint work.
- Follows the documented architecture.
- Does not redesign the project independently.

---

# Architecture

The project architecture is defined by:

- ARCHITECTURE.md
- DATA_MODEL.md
- DECISIONS.md
- DESIGN_GUIDE.md

If these documents appear inconsistent, STOP and ask for clarification before making changes.

---

# General Rules

Before implementing a sprint:

1. Read the relevant documentation.
2. Understand the existing architecture.
3. Ask questions if requirements are unclear.
4. Do not invent requirements.

---

# Architecture Rules

Never redesign the architecture.

If an architectural change appears necessary:

STOP.

Explain:

- why
- advantages
- disadvantages
- proposed solution

Wait for approval.

---

# Data Layer

mediaStore.js is the application's shared data layer.

All runtime access to media.json must go through mediaStore.js.

Viewers should never read media.json directly.

---

# Design Principles

Prefer encapsulation over duplication.

When provider-specific behavior may expand in the future, isolate that behavior behind a helper function or module.

Examples:

- buildVideoEmbedUrl(video)
- mediaStore.getMedia(id)
- mediaStore.getAlbum(id)

Do not scatter provider-specific logic throughout viewer code.

---

# Code Quality

Prefer:

- small functions
- descriptive names
- readable code
- maintainability over cleverness

Avoid:

- duplicated logic
- unnecessary abstractions
- dead code

---

# Documentation

Keep documentation synchronized with implementation.

If implementation changes the architecture or data model:

Update the appropriate documentation.

Do not duplicate documentation across multiple files.

Each topic should have one authoritative source.

---

# Git

Do not commit unless instructed.

Do not push unless instructed.

Provide a suggested commit message after each sprint.

---

# Testing

Before considering a sprint complete:

- verify there are no JavaScript errors
- verify there are no broken links
- verify there are no missing resources
- perform a self-review
- summarize changes

---

# Goal

Build Explore as a clean, maintainable, extensible application suitable for long-term growth.

Question assumptions when appropriate.

If a better implementation exists that preserves the documented architecture, explain it before coding.