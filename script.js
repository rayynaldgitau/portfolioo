/**
 * Initializes accessible mobile navigation toggle with ARIA expanded sync.
 * @returns {void}
 */
function initAccessibleNav() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('primary-nav-links') || document.getElementById('nav-links');

    if (!mobileMenuBtn || !navLinks) return;

    mobileMenuBtn.addEventListener('click', () => {
        // Toggle ARIA expanded state for screen reader awareness
        const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
        mobileMenuBtn.setAttribute('aria-expanded', String(!isExpanded));
        navLinks.classList.toggle('active');

        const icon = mobileMenuBtn.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-bars', isExpanded);
            icon.classList.toggle('fa-times', !isExpanded);
        }
    });

    // Close menu automatically on mobile when an anchor link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initAccessibleNav();

    // --- Gentle Fade-Ins on Scroll ---
    const fadeElements = document.querySelectorAll('.fade-in');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    fadeElements.forEach(element => {
        observer.observe(element);
    });

    // --- Smooth Anchor Scrolling ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return; 

            const targetElement = document.querySelector(targetId);
            
            if(targetElement) {
                e.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop - 80, 
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Interactive Live Code Showcase Logic ---
    const skillData = {
        react: {
            filename: "UserDashboard.tsx",
            badge: "Frontend Architecture",
            summary: "Modular state management, custom hook isolation, and sub-16ms virtual DOM updates.",
            capabilities: ["Custom Hooks & Context", "TypeScript Strict Types", "Optimistic State Updates", "Accessible Aria Widgets"],
            useCases: ["Analytics Dashboards", "Reactive Event Hubs", "Design System Components"],
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
            filename: "BillingController.php",
            badge: "RESTful Backend & Validation",
            summary: "Atomic database transactions, strict request validation, and predictable API responses.",
            capabilities: ["DB Atomic Transactions", "Payload Sanitization", "Repository Pattern", "JSON API Resource Serialization"],
            useCases: ["Utility Billing Systems", "Financial Invoicing Engines", "Enterprise Multi-Tenant Routing"],
            code: `<?php

namespace App\\Http\\Controllers;

use App\\Models\\Account;
use Illuminate\\Http\\Request;
use Illuminate\\Support\\Facades\\DB;

class BillingController extends Controller
{
    /**
     * Executes atomic invoice generation across accounts.
     */
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
            filename: "eventRouter.js",
            badge: "Event-Driven Backend",
            summary: "Asynchronous non-blocking I/O, middleware security chains, and low-latency REST endpoints.",
            capabilities: ["Express Middleware Chains", "Async Error Boundaries", "JWT Verification", "Connection Pool Routing"],
            useCases: ["Real-time RSVP Pipelines", "REST API Gateways", "Stateless Session Microservices"],
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
    next(err); // Route to global error handler
  }
});

module.exports = router;`
        },
        python: {
            filename: "data_pipeline.py",
            badge: "Automation & Data Logic",
            summary: "Batch record parsing, schema normalization, and automated system synchronization.",
            capabilities: ["Batch Record Processing", "Input Normalization", "Automated Cron Daemons", "Audit Logging"],
            useCases: ["Billing System Cron Jobs", "Database Integrity Audits", "Data Migration Scripts"],
            code: `"""Automated Data Pipeline Engine."""
from typing import List, Dict, Any
import logging

logger = logging.getLogger(__name__)

def process_consumption_records(records: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    """
    Parses, validates, and calculates metered utility cycles.
    """
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
    if (skillTabs.length > 0) {
        const fileNameEl = document.getElementById('skill-filename');
        const badgeEl = document.getElementById('skill-badge');
        const codeContentEl = document.getElementById('code-content');
        const lineNumbersEl = document.getElementById('line-numbers');
        const skillCapabilitiesEl = document.getElementById('skill-capabilities');
        const skillSummaryEl = document.getElementById('skill-summary');
        const useCasesEl = document.getElementById('use-cases');

        /**
         * Renders selected technical skill code and architectural highlights.
         * @param {string} skillKey - The skill identifier (react, php, node, python).
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
                    span.textContent = cap;
                    skillCapabilitiesEl.appendChild(span);
                });
            }

            if (useCasesEl) {
                useCasesEl.innerHTML = '';
                data.useCases.forEach(useCase => {
                    const span = document.createElement('span');
                    span.textContent = useCase;
                    useCasesEl.appendChild(span);
                });
            }

            if (lineNumbersEl) {
                const lineCount = data.code.split('\n').length;
                lineNumbersEl.innerHTML = '';
                for (let i = 1; i <= lineCount; i++) {
                    lineNumbersEl.innerHTML += `${i}<br>`;
                }
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
                
                const skillKey = tab.getAttribute('data-skill');
                updateSkillUI(skillKey);
            });
        });

        // Initialize default tab
        updateSkillUI('react');
    }

    // --- Copy Email to Clipboard with Accessible Feedback ---
    const copyEmailBtn = document.getElementById('btn-copy-email');
    const copyTooltip = document.getElementById('copy-tooltip');
    if (copyEmailBtn && copyTooltip) {
        copyEmailBtn.addEventListener('click', async () => {
            const emailAddress = 'raynaldgitau@gmail.com';
            try {
                await navigator.clipboard.writeText(emailAddress);
                copyTooltip.textContent = 'Copied!';
                copyTooltip.classList.add('show');
            } catch (err) {
                // Fallback for older browsers
                const tempInput = document.createElement('input');
                tempInput.value = emailAddress;
                document.body.appendChild(tempInput);
                tempInput.select();
                document.execCommand('copy');
                document.body.removeChild(tempInput);
                copyTooltip.textContent = 'Copied!';
                copyTooltip.classList.add('show');
            }

            setTimeout(() => {
                copyTooltip.textContent = 'Copy';
                copyTooltip.classList.remove('show');
            }, 2000);
        });
    }
});