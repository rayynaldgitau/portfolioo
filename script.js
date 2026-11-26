/**
 * Initializes Light/Dark M3 color scheme from saved preference or OS setting,
 * and wires the header toggle button.
 * @returns {void}
 */
function initThemeToggle() {
    const root = document.documentElement;
    const toggleBtn = document.getElementById('theme-toggle-btn');
    const storageKey = 'm3-scheme';

    /**
     * Applies the active color scheme and updates toggle button state.
     * @param {'light'|'dark'} scheme - Target color scheme.
     * @returns {void}
     */
    function applyScheme(scheme) {
        root.dataset.scheme = scheme;
        if (!toggleBtn) return;

        const isDark = scheme === 'dark';
        toggleBtn.setAttribute('aria-pressed', String(isDark));
        toggleBtn.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');

        const sunIcon = toggleBtn.querySelector('.icon-sun');
        const moonIcon = toggleBtn.querySelector('.icon-moon');
        if (sunIcon && moonIcon) {
            sunIcon.style.display = isDark ? 'block' : 'none';
            moonIcon.style.display = isDark ? 'none' : 'block';
        }
    }

    const saved = localStorage.getItem(storageKey);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyScheme(saved === 'dark' || saved === 'light' ? saved : (prefersDark ? 'dark' : 'light'));

    if (!toggleBtn) return;

    toggleBtn.addEventListener('click', () => {
        const next = root.dataset.scheme === 'dark' ? 'light' : 'dark';
        localStorage.setItem(storageKey, next);
        applyScheme(next);
    });
}

/**
 * Initializes accessible mobile navigation drawer with ARIA expanded sync
 * and Escape-key dismissal.
 * @returns {void}
 */
function initAccessibleNav() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('primary-nav-links') || document.getElementById('nav-links');

    if (!menuBtn || !navLinks) return;

    /**
     * Sets mobile menu open or closed state and syncs icon/ARIA attributes.
     * @param {boolean} open - Whether the menu should be open.
     * @returns {void}
     */
    function setMenuOpen(open) {
        navLinks.classList.toggle('active', open);
        menuBtn.setAttribute('aria-expanded', String(open));

        const menuIcon = menuBtn.querySelector('.icon-menu');
        const closeIcon = menuBtn.querySelector('.icon-close');
        if (menuIcon && closeIcon) {
            menuIcon.style.display = open ? 'none' : 'block';
            closeIcon.style.display = open ? 'block' : 'none';
        }
    }

    menuBtn.addEventListener('click', () => {
        const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
        setMenuOpen(!isExpanded);
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => setMenuOpen(false));
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && navLinks.classList.contains('active')) {
            setMenuOpen(false);
            menuBtn.focus();
        }
    });
}

/**
 * Initializes scroll-triggered reveals using IntersectionObserver with
 * non-uniform delays and reduced-motion bypass.
 * @returns {void}
 */
function initScrollReveals() {
    const revealEls = document.querySelectorAll('[data-reveal]');
    if (revealEls.length === 0) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || !('IntersectionObserver' in window)) {
        revealEls.forEach(el => el.classList.add('is-visible'));
        return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                obs.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.08
    });

    revealEls.forEach(el => observer.observe(el));
}

/**
 * Applies subtle GPU-composited scroll parallax to decorative background shapes.
 * Disabled automatically when prefers-reduced-motion is active.
 * @returns {void}
 */
function initDecorativeParallax() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const shapes = document.querySelectorAll('.geo-accent[data-parallax]');
    if (shapes.length === 0) return;

    let ticking = false;

    /**
     * Updates transform offsets on decorative shapes inside an animation frame.
     * @returns {void}
     */
    function updatePositions() {
        const scrollY = window.scrollY;
        shapes.forEach(shape => {
            const speed = parseFloat(shape.getAttribute('data-parallax') || '0.06');
            const offset = Math.round(scrollY * speed * 10) / 10;
            shape.style.transform = `translate3d(0, ${offset}px, 0)`;
        });
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updatePositions);
            ticking = true;
        }
    }, { passive: true });
}

/**
 * Initializes the interactive code showcase tabs and M3 skill chips.
 * @returns {void}
 */
function initSkillShowcase() {
    const skillData = {
        react: {
            filename: 'UserDashboard.tsx',
            badge: 'Frontend Architecture',
            summary: 'Modular state management, custom hook isolation, and sub-16ms virtual DOM updates.',
            capabilities: ['Custom Hooks & Context', 'TypeScript Strict Types', 'Optimistic State Updates', 'Accessible ARIA Widgets'],
            useCases: ['Analytics Dashboards', 'Reactive Event Hubs', 'Design System Components'],
            code: `// React + TypeScript State & API Architecture
interface DashboardProps {
  userId: string;
}

export const UserDashboard = ({ userId }: DashboardProps) => {
  const { data, loading, error } = useUserData(userId);

  if (loading) return <SkeletonLoader variant="dashboard" />;
  if (error) return <ErrorMessage message="Unable to load profile." />;

  return (
    <section className="dashboard-grid" aria-label="User metrics">
      <MetricCard title="System Uptime" value={data.uptime} />
      <TransactionList items={data.recentTransactions} />
    </section>
  );
};`
        },
        php: {
            filename: 'BillingController.php',
            badge: 'RESTful Backend & Validation',
            summary: 'Atomic database transactions, strict request validation, and predictable API responses.',
            capabilities: ['DB Atomic Transactions', 'Payload Sanitization', 'Repository Pattern', 'JSON API Resources'],
            useCases: ['Utility Billing Systems', 'Financial Invoicing Engines', 'Multi-Tenant Routing'],
            code: `<?php

namespace App\\Http\\Controllers;

use App\\Models\\Account;
use Illuminate\\Http\\Request;
use Illuminate\\Support\\Facades\\DB;

class BillingController extends Controller
{
    public function generateInvoice(Request $request)
    {
        $validated = $request->validate([
            'account_id' => 'required|uuid',
            'amount_units' => 'required|numeric|min:0.01'
        ]);

        return DB::transaction(function () use ($validated) {
            $account = Account::findOrFail($validated['account_id']);
            $invoice = $account->invoices()->create($validated);

            return response()->json(['status' => 'success', 'data' => $invoice], 201);
        });
    }
}`
        },
        node: {
            filename: 'eventRouter.js',
            badge: 'Event-Driven Backend',
            summary: 'Asynchronous non-blocking I/O, middleware security chains, and low-latency REST endpoints.',
            capabilities: ['Express Middleware Chains', 'Async Error Boundaries', 'JWT Verification', 'Connection Pooling'],
            useCases: ['Real-time RSVP Pipelines', 'REST API Gateways', 'Stateless Sessions'],
            code: `// Node.js Express Asynchronous Router
const express = require('express');
const router = express.Router();
const { verifyAuth } = require('../middleware/auth');
const eventService = require('../services/eventService');

router.post('/rsvp/:eventId', verifyAuth, async (req, res, next) => {
  try {
    const { eventId } = req.params;
    const { userId } = req.user;

    const rsvpStatus = await eventService.recordAttendance(eventId, userId);
    return res.status(200).json({ success: true, status: rsvpStatus });
  } catch (err) {
    next(err);
  }
});

module.exports = router;`
        },
        python: {
            filename: 'data_pipeline.py',
            badge: 'Automation & Data Logic',
            summary: 'Batch record parsing, schema normalization, and automated system synchronization.',
            capabilities: ['Batch Record Processing', 'Input Normalization', 'Automated Cron Daemons', 'Audit Logging'],
            useCases: ['Billing Cron Jobs', 'Database Integrity Audits', 'Data Migration Scripts'],
            code: `"""Automated Data Pipeline Engine."""
from typing import List, Dict, Any
import logging

logger = logging.getLogger(__name__)

def process_consumption_records(records: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    verified_batch = []
    for entry in records:
        if not entry.get("meter_id") or entry.get("units_consumed", 0) < 0:
            logger.warning("Skipping invalid payload: %s", entry)
            continue

        entry["billable_amount"] = round(entry["units_consumed"] * 1.45, 2)
        verified_batch.append(entry)

    return verified_batch`
        }
    };

    const skillTabs = document.querySelectorAll('.skill-tab');
    if (skillTabs.length === 0) return;

    const fileNameEl = document.getElementById('skill-filename');
    const badgeEl = document.getElementById('skill-badge');
    const codeContentEl = document.getElementById('code-content');
    const lineNumbersEl = document.getElementById('line-numbers');
    const skillCapabilitiesEl = document.getElementById('skill-capabilities');
    const skillSummaryEl = document.getElementById('skill-summary');
    const useCasesEl = document.getElementById('use-cases');

    /**
     * Renders selected technical skill code and M3 capability chips.
     * @param {string} skillKey - Key in skillData map.
     * @returns {void}
     */
    function updateSkillUI(skillKey) {
        const data = skillData[skillKey];
        if (!data) return;

        if (fileNameEl) fileNameEl.textContent = data.filename;
        if (badgeEl) badgeEl.textContent = data.badge;
        if (codeContentEl) codeContentEl.textContent = data.code;
        if (skillSummaryEl) skillSummaryEl.textContent = data.summary;

        if (skillCapabilitiesEl) {
            skillCapabilitiesEl.innerHTML = '';
            data.capabilities.forEach(cap => {
                const span = document.createElement('span');
                span.className = 'm3-chip';
                span.textContent = cap;
                skillCapabilitiesEl.appendChild(span);
            });
        }

        if (useCasesEl) {
            useCasesEl.innerHTML = '';
            data.useCases.forEach(useCase => {
                const span = document.createElement('span');
                span.className = 'm3-chip';
                span.textContent = useCase;
                useCasesEl.appendChild(span);
            });
        }

        if (lineNumbersEl) {
            const lineCount = data.code.split('\n').length;
            lineNumbersEl.innerHTML = Array.from({ length: lineCount }, (_, idx) => idx + 1).join('<br>');
        }
    }

    skillTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            skillTabs.forEach(t => {
                t.classList.remove('active');
                t.setAttribute('aria-selected', 'false');
            });
            tab.classList.add('active');
            tab.setAttribute('aria-selected', 'true');
            updateSkillUI(tab.getAttribute('data-skill'));
        });
    });

    updateSkillUI('react');
}

/**
 * Initializes 1-click email copy button with accessible tooltip feedback.
 * @returns {void}
 */
function initCopyEmail() {
    const copyEmailBtn = document.getElementById('btn-copy-email');
    const copyTooltip = document.getElementById('copy-tooltip');
    if (!copyEmailBtn || !copyTooltip) return;

    copyEmailBtn.addEventListener('click', async () => {
        const emailAddress = 'raynaldgitau@gmail.com';
        try {
            await navigator.clipboard.writeText(emailAddress);
        } catch (err) {
            const tempInput = document.createElement('input');
            tempInput.value = emailAddress;
            document.body.appendChild(tempInput);
            tempInput.select();
            document.execCommand('copy');
            document.body.removeChild(tempInput);
        }

        copyTooltip.textContent = 'Copied!';
        copyTooltip.classList.add('show');

        setTimeout(() => {
            copyTooltip.textContent = 'Copy';
            copyTooltip.classList.remove('show');
        }, 2000);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initAccessibleNav();
    initScrollReveals();
    initDecorativeParallax();
    initSkillShowcase();
    initCopyEmail();
});
