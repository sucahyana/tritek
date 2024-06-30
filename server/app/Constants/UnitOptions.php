<?php

namespace App\Constants;

use PhpUnitsOfMeasure\PhysicalQuantity\Mass;
use PhpUnitsOfMeasure\PhysicalQuantity\Length;

class UnitOptions
{
    public static $massUnits = [
        'mg', 'g', 'kg', 't', 'oz', 'lb', 'quintal'
    ];

    public static $lengthUnits = [
        'mm', 'cm', 'dm', 'm', 'dam', 'hm', 'km', 'inch', 'foot', 'yd', 'mile'
    ];

    public static $otherUnits = [
        'roll', 'sheet', 'rod', 'pack', 'box', 'bottle', 'sack', 'can', 'piece'
    ];

    public static function convertToUnit($quantity, $fromUnit, $toUnit)
    {
        if (in_array($fromUnit, self::$massUnits) && in_array($toUnit, self::$massUnits)) {
            $mass = new Mass($quantity, $fromUnit);
            return $mass->toUnit($toUnit);
        }

        if (in_array($fromUnit, self::$lengthUnits) && in_array($toUnit, self::$lengthUnits)) {
            $length = new Length($quantity, $fromUnit);
            return $length->toUnit($toUnit);
        }
        throw new \Exception("Conversion from $fromUnit to $toUnit is not supported.");
    }
}
