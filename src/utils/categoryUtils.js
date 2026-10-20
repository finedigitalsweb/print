/**
 * Category Hierarchy Utilities
 * Supports 3-level category hierarchy:
 * Level 0: Main Category (e.g. Infants)
 * Level 1: Subcategory (e.g. Boys, Girls)
 * Level 2: Sub-subcategory / Child Subcategory (e.g. 0-6 Months, 6-12 Months, Dresses)
 */

/**
 * Normalizes raw subcategory data (JSON string, comma string, or array) into a structured tree:
 * @returns {Array<{ name: string, subcategories: string[] }>}
 */
export function parseCategoryHierarchy(raw) {
  if (!raw) return [];

  // 1. If already an array
  if (Array.isArray(raw)) {
    return raw.map((item) => {
      if (typeof item === 'string') {
        const trimmed = item.trim();
        return { name: trimmed, subcategories: [] };
      }
      if (typeof item === 'object' && item !== null) {
        const name = String(item.name || item.title || '').trim();
        const children = Array.isArray(item.subcategories)
          ? item.subcategories.map(s => String(typeof s === 'object' && s !== null ? s.name : s).trim()).filter(Boolean)
          : (Array.isArray(item.children)
              ? item.children.map(s => String(typeof s === 'object' && s !== null ? s.name : s).trim()).filter(Boolean)
              : (typeof item.subcategories === 'string' && item.subcategories.trim()
                  ? item.subcategories.split(',').map(s => s.trim()).filter(Boolean)
                  : []));
        return { name, subcategories: children };
      }
      return null;
    }).filter(Boolean);
  }

  // 2. If it's a string
  if (typeof raw === 'string') {
    const trimmed = raw.trim();
    if (!trimmed) return [];

    // Check if it's JSON
    if (trimmed.startsWith('[') || trimmed.startsWith('{')) {
      try {
        const parsed = JSON.parse(trimmed);
        return parseCategoryHierarchy(parsed);
      } catch {
        // Fall back to text parsing if JSON is malformed
      }
    }

    // Check if it has parenthetical syntax: "Boys (0-6M, 6-12M), Girls (Dresses, Tops)"
    if (trimmed.includes('(') && trimmed.includes(')')) {
      const regex = /([^,(]+)(?:\(([^)]*)\))?/g;
      const items = [];
      let match;
      while ((match = regex.exec(trimmed)) !== null) {
        const parentName = match[1]?.trim();
        if (parentName) {
          const childrenStr = match[2]?.trim() || '';
          const children = childrenStr
            ? childrenStr.split(',').map((s) => s.trim()).filter(Boolean)
            : [];
          items.push({ name: parentName, subcategories: children });
        }
      }
      if (items.length > 0) return items;
    }

    // Standard comma-separated: "Boys, Girls"
    return trimmed
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
      .map((name) => ({ name, subcategories: [] }));
  }

  return [];
}

/**
 * Serializes hierarchy into a storage string.
 * If there are Level 2 subcategories, it stores as clean JSON.
 * If all subcategories are simple Level 1 without children, stores as clean comma-separated or JSON.
 */
export function serializeCategoryHierarchy(hierarchy) {
  if (!Array.isArray(hierarchy) || hierarchy.length === 0) return null;

  const sanitized = hierarchy
    .map((item) => ({
      name: (item.name || '').trim(),
      subcategories: Array.isArray(item.subcategories)
        ? item.subcategories.map((s) => String(s).trim()).filter(Boolean)
        : []
    }))
    .filter((item) => Boolean(item.name));

  if (sanitized.length === 0) return null;

  // Check if any subcategory has Level 2 items
  const hasLevel2 = sanitized.some((item) => item.subcategories.length > 0);

  if (hasLevel2) {
    return JSON.stringify(sanitized);
  }

  // Plain comma-separated if no level 2 items
  return sanitized.map((item) => item.name).join(', ');
}

/**
 * Returns Level 1 subcategory names as string array for a category
 */
export function getSubcategoryNames(cat) {
  if (!cat) return [];
  const hierarchy = parseCategoryHierarchy(cat.subcategories || cat);
  return hierarchy.map((item) => item.name);
}

/**
 * Returns Level 2 child subcategory names for a specific category + Level 1 subcategory
 */
export function getLevel2Subcategories(cat, subCatName) {
  if (!cat || !subCatName) return [];
  const hierarchy = parseCategoryHierarchy(cat.subcategories || cat);
  const found = hierarchy.find(
    (item) => item.name.toLowerCase() === String(subCatName).toLowerCase().trim()
  );
  return found?.subcategories || [];
}

/**
 * Checks if a specific category + subcategory has Level 2 children
 */
export function hasLevel2Subcategories(cat, subCatName) {
  return getLevel2Subcategories(cat, subCatName).length > 0;
}
