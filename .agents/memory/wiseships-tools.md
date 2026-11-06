---
name: WiseShips Tools direction
description: Product direction for WiseShips' growing collection of freight operations tools.
---

WiseShips Tools is intended to grow as a collection of practical freight-operations tools. Add new tools under the existing Tools navigation pattern, using the same menu treatment as Platform and the established WiseShips visual language. The first tool is a Spanish freight glossary covering maritime, air, road, customs, and Incoterms terminology.

**Why:** The user described the glossary as the first tool in a broader Tools area and requested the same UI menu pattern as Platform.

**How to apply:** Keep future tools discoverable from Tools and visually consistent with WiseShips rather than creating a separate brand or navigation pattern.

For the freight calculator, accept only numeric input: quantities are whole numbers; dimensions, weights, and the volumetric factor may use one decimal separator. Normalize a decimal comma to a point, reject letters and signs, and do not calculate incomplete values.

**Why:** The user explicitly asked to prevent input bugs and allow values such as 22 or 22.30.

**How to apply:** Preserve these validation rules if the calculator's inputs or calculation flow are changed.

The 3D container planner is distinct from the CBM/chargeable-weight calculator. Treat preset dimensions and payloads as references, and present load placement as an estimate rather than an optimal or certified stowage plan.

**Why:** Container specifications vary, and a geometric heuristic cannot verify operational requirements such as load securing or weight distribution.

**How to apply:** Preserve the estimates-only disclaimer in planner views and any future exports; remind users to confirm actual equipment limits and stowage requirements.
